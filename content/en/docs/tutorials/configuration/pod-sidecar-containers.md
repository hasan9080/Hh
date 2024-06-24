---
title: Adopting Sidecar Containers
content_type: tutorial
weight: 40
min-kubernetes-server-version: 1.29
---

<!-- overview -->

This section is relevant for people adopting [sidecar containers](/docs/concepts/workloads/pods/sidecar-containers/) for their workloads.

{{< feature-state feature_gate_name=`SidecarContainers >}}

## {{% heading "objectives" %}}

* Understand the need for sidecar containers
* Be able to troubleshoot issues with the sidecar containers
* Understand options to universally "inject" sidecar containers to any workload


## {{% heading "prerequisites" %}}

{{< include "task-tutorial-prereqs.md" >}} {{< version-check >}}



<!-- lessoncontent -->

## Sidecar containers overview

Sidecar containers are the secondary containers that run along with the main
application container within the same {{< glossary_tooltip text="Pod" term_id="pod" >}}.
These containers are used to enhance or to extend the functionality of the primary _app
container_ by providing additional services, or functionality such as logging, monitoring,
security, or data synchronization, without directly altering the primary application code.
You can read more at [Sidecar containers concept page](/docs/concepts/workloads/pods/sidecar-containers/).

The concept of sidecar containers is not new and there are multiple implementation of this concept.
The feature is being used by end users as well as by the sidecar authors who provide ways to "inject"
sidecar containers to any Pod. Those "injectors" are typically implemented as [mutating webhook](/docs/reference/access-authn-authz/admission-controllers/#mutatingadmissionwebhook).

While the concept of sidecar containers is not new,
the native implementation of this feature in Kubernetes, however, is new. And as with every new feature,
adopting this feature may present certain challenges.

This article explore challenges and solution can be experienced by end users as well as
by authors of sidecar containers.

## Benefits of a built-in sidecar containers

There are many benefits for the built-in sidecar containers.

1. Built-in sidecar containers can run before Init containers.
2. It is guaranteed that built-in sidecar containers finish AFTER all the regular containers completion.
3. With Jobs, when Pod's `restartPolicy=OnFailure` or `restartPolicy=Never`,
   built-in sidecar containers will not block Pod completion.
4. Also, with Jobs, build-in sidecar containers will keep being restarted, even if regular containers would not with Pod's `restartPolicy=Never`.

These benefits are drastic, and lead to faster adoption that we see with other Kubernetes features.

## Adopting sidecar containers

The `SidecarContainers` feature is in beta state starting Kubernetes version `1.29` and is enabled by default.
Some clusters may have this feature disabled or have software installed that is incompatible with the feature.

When this happens, the Pod may be rejected or the sidecar containers may block Pod startup, rendering the Pod useless.
This condition is easy to detect as Pod simply get stuck on initialization. However, it is rarely clear what caused the problem.

Here are the considerations and troubleshooting steps that one can take while adopting sidecar containers for their workload.

**Ensure the feature gate is enabled.**

As a very first step, make sure that both - API server and Nodes were upgraded to the version `1.29+`.
The feature will break on clusters where Nodes are running earlier versions where it is not enabled.

The feature gate enablement should also be validated for both - API server AND Nodes.

One of the ways to check the feature gate enablement is running a command like this:

- For API Server 
  `kubectl get --raw /metrics | grep kubernetes_feature_enabled | grep SidecarContainers`
- For the individual node: 
  `kubectl get --raw /api/v1/nodes/<node-name>/proxy/metrics | grep kubernetes_feature_enabled | grep SidecarContainers`

If you see something like: `kubernetes_feature_enabled{name="SidecarContainers",stage="BETA"} 1`,
it means that the feature is enabled.

**Check for 3rd party tooling and mutating webhooks**

If you experience issues when validating the feature, it may be an indication that one of the
3rd party tools or mutating webhooks are broken.

The `SidecarContainers` feature adds a new field that is define in Kubernetes `1.28` API.
Some tools or mutating webhooks might have been built with an earlier version of Kubernetes API.
If tools pass the unknown fields as-is or mutating webhooks are using the recommended `Patch` method to mutate Pods, it will not be a problem.

However there are tools that will strip out unknown fields and must be recompiled with the v1.28+ version of Kubernetes API.

The way to check this is to use the `kubectl describe pod` command with your Pod.
If any tools stripped out the new field (`restartPolicy:Always`), you will not find see it in the command output.

If you hit an issue like this, please advise the author of the tools or the webhooks to switch to `Patch` method of modifying objects.

{{< alert  title="Note" color="info" >}}

Mutating webhook may update Pods based on some conditions. So sidecar containers may work for some Pods and fail for others.

{{< /alert >}}

**Automatic injection of sidecars**

If you are using software that injects sidecars automatically,
there are a few possible strategies you may follow to
ensure that native sidecar container can be used.
All of the strategies are generally options you may choose to decide whether
the Pod the sidecar will be injected to will land on a Node supporting the feature or not.

As an example, you can follow this conversation: https://github.com/istio/istio/issues/48794

1. Mark Pods that lands to nodes supporting sidecars. You can use node labels
   and node affinity to mark nodes supporting sidecar containers and Pods landing on those nodes.
2. Check Nodes compatibility on injection. During sidecar injection you may use the following strategies to check node compatibility:
   - query node version and assume the feature gate is enabled on the version 1.29+
   - query node prometheus metrics and check feature enablement status
   - assume the nodes are running in a [supported version skew](https://kubernetes.io/releases/version-skew-policy/#supported-version-skew).
     If API version is 1.32+, assume all the nodes support the feature.
   - there may be other custom ways to detect nodes compatibility.
3. Develop a universal sidecar injector. The idea of a universal sidecar container is to inject a sidecar container
   as a regular container as well as a native sidecar container. And have a runtime logic to decide which one will work.
   The universal sidecar injector is wasteful as it will account for requests twice, but may be considered as a workable solution for special cases.
   - One way would be on start of a native sidecar container
     detect the node version and exit immediately if the version does not support the sidecar feature.
   - Consider runtime feature detection design:
     - Define an empty dir so containers can communicate with each other
     - Inject init container `NativeSidecar` with `restartPolicy=Always`. 
     - `NativeSidecar` must write a file to an empty dir indicating the first run and exists immediately with exit code `0`.
     - `NativeSidecar` on restart (when native sidecars are supported) checks that file already exists in the empty dir and changes it - indicating that the built-in sidecar containers are supported and running.
     - Inject regular container `OldWaySidecar`.
     - `OldWaySidecar` on start checks the presence of a file in an empty dir.
     - If the file indicates that the `NativeSidecar` is NOT running - it assumes that the sidecar feature is not supported and works assuming it is the sidecar.
     - If the file indicates that the `NativeSidecar` is running - it either does nothing and sleeps forever (in case when Pod’s `restartPolicy=Always`) or exists immediately with exit code `0` (in case when Pod’s `restartPolicy!=Always`).


## {{% heading "whatsnext" %}}


* Learn more about [SidecarContainers](/docs/concepts/workloads/pods/sidecar-containers/).
