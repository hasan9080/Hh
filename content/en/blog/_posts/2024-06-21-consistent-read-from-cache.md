---
layout: blog
title: 'Kubernetes Consistent Reads from Cache: A Leap in Performance and Scalability'
date: 2024-06-21
slug: consistent-read-from-cache-beta
author: >
  Marek Siarkowicz (Google)
---

Kubernetes is renowned for its robust orchestration of containerized applications,
but as clusters grow, the demands on the control plane can become a bottleneck.
A key challenge has been ensuring consistent reads from the etcd datastore,
often requiring resource-intensive quorum reads.

Today, we're excited to announce a major improvement: **Consistent Reads from Cache**, graduating to Beta in Kubernetes 1.31.

### Why Consistent Reads Matter

Consistent reads are essential for ensuring that Kubernetes components,
like the kubelet, have an accurate view of the cluster state.
In the past, these reads involved a round-trip to etcd to guarantee consistency.
While effective, this approach can lead to performance issues in large clusters,
especially when kubelets need to frequently list pods scheduled on their nodes.

### The Breakthrough: Caching with Confidence

Kubernetes has long used a watch cache to optimize read operations.
The watch cache stores a snapshot of the cluster state and receives updates through etcd watches.
However, until now, it couldn't serve consistent reads directly, as there was no guarantee the cache was sufficiently up-to-date.

**The Consistent Reads from Cache** feature addresses this by intelligently using
etcd's "progress notifications." These notifications allow the watch cache to know
precisely how current its data is.  When a consistent read is requested, the system
first checks the progress notification. If the cache is sufficiently up-to-date,
the read is served directly from the cache, bypassing the need for a full etcd round-trip.

**Important Note:** To fully benefit from this feature, your Kubernetes cluster
must be running etcd version 3.4.31+ or 3.5.13+.
Older etcd versions lack the necessary functionality and are now considered deprecated for use with Kubernetes.

But don't worry, support for older versions will continue as long as they are officially supported by etcd.
We don't expect to break v3.4 and v3.5 minors until etcd project makes another one release.

### Performance Gains You'll Notice

This seemingly simple change has a profound impact on Kubernetes performance and scalability:

* **Reduced etcd Load:**  Consistent reads no longer burden etcd with quorum reads,
  freeing up resources for other critical operations.
* **Lower Latency:**  Serving reads from cache is significantly faster than fetching
  and processing data from etcd. This translates to quicker responses for kubelets
  and other components, improving overall cluster responsiveness.
* **Improved Scalability:** Large clusters with thousands of nodes and pods will
  see the most significant gains, as the reduction in etcd load allows the
  control plane to handle more requests without sacrificing performance.

**5k Node Scalability Test Results:** In recent scalability tests on 5,000 node
  clusters, Consistent Reads from Cache delivered impressive improvements:

* **30% reduction** in kube-apiserver CPU usage
* **25% reduction** in etcd CPU usage
* **Up to 3x reduction** (from 5 seconds to 1.5 seconds) in 99th percentile pod LIST request latency

### What's Next?

With the Beta release, Consistent Reads from Cache is enabled by default,
offering a seamless performance boost to all Kubernetes users running a supported
etcd version. We're also introducing new metrics (like `apiserver_watch_cache_read_wait`)
to help you monitor the feature's impact and ensure your watch cache is healthy.

Our journey doesn't end here. We're actively exploring pagination support in the
watch cache, which will unlock even more performance optimizations in the future.

### Getting Started

Upgrading to Kubernetes 1.31 and ensuring you are using etcd version 3.4.31+ or
3.5.13+ is the easiest way to experience the benefits of Consistent Reads from
Cache. If you have any questions or feedback, don't hesitate to reach out to the Kubernetes community.

**Let us know how Consistent Reads from Cache transforms your Kubernetes experience!**

Special thanks to @ah8ad3 and @p0lyn0mial for their contributions to this feature!
