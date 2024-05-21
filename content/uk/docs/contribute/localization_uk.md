---
content_type: concept
title: Рекомендації з перекладу українською мовою
weight: 130
card:
  name: contribute
  weight: 100
  title: Рекомендації з перекладу українською мовою
anchors:
  - anchor: "#правила-перекладу"
    title: Правила перекладу
  - anchor: "#словник"
    title: Словник
---

<!-- overview -->

Дорогі друзі! Раді вітати вас у спільноті українських учасників проєкту Kubernetes. Ця сторінка створена з метою полегшити вашу роботу в роботі з перекладу документації. Вона містить правила, якими ми керувалися під час перекладу, і базовий словник, який ми почали укладати. Перелічені у ньому терміни ви знайдете в українській версії документації Kubernetes. Будемо дуже вдячні, якщо ви допоможете нам доповнити цей словник і розширити правила перекладу.

Сподіваємось, наші рекомендації стануть вам у пригоді.

<!-- body -->

## Загальний процес

1. Виберіть одне з [найбільш нагальних завдань](https://github.com/kubernetes-i18n-ukrainian/website/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+no%3Aassignee+label%3A%22most+wanted%22) або [будь-яке інше](https://github.com/kubernetes-i18n-ukrainian/website/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+no%3Aassignee) і залиште в ньому коментар на кшталт "Працюю над цим". Ми надішлемо вам запрошення до організації та закріпимо його за вами.</sup>
2. Клонуйте (зробіть форк) репозиторію [kubernetes/website](https://github.com/kubernetes/website).
3. Ознайомтесь з цим документом.
4. Зробіть переклад
5. Створіть пул-реквест в [kubernetes/website](https://github.com/kubernetes/website).

Якщо вам знадобиться допомога, зареєструйтеся в [Slack Kubernetes](https://slack.k8s.io/), приєднайтеся до каналу[`#kubernetes-docs-uk`](https://kubernetes.slack.com/archives/CSKCYN138) та спитайте там.

### Отримання допомоги

Якщо ви виявили вади в перекладеному вмісті, [створіть тікет на kubernetes/website](https://github.com/kubernetes/website/issues/new/choose) за позначкою `/language uk`.

Репозиторієм [kubernetes-i18n-ukrainian/website](https://github.com/kubernetes-i18n-ukrainian/website) слід користуватись лише для спрощення процесу локалізації.[^1]

[^1]: На превеликий жаль, поточний репозиторій перебуває в підвішеному стані, якихось активностей в ньому немає з 2020 року. 😢

### Наявні проблеми/оновлення локалізації

Якщо ви виявили проблеми з перекладеним вмістом і не можете їх негайно виправити, [створіть тікет у kubernetes/website](https://github.com/kubernetes/website/issues/new/choose) з описом що не так, на якій сторінці (посилання) і додайте в опис тікета, з нового рядка, команду [Prow](https://prow.k8s.io/command-help) — `/language uk`.

## Правила перекладу

* У випадку, якщо у перекладі термін набуває неоднозначності та розуміння тексту ускладнюється, надайте у дужках англійський варіант, наприклад: кінцеві точки (endpoints). Якщо при перекладі термін втрачає своє значення, краще не перекладати його, наприклад: характеристики affinity.
* Назви обʼєктів Kubernetes залишаємо без перекладу і пишемо з великої літери: Service, Pod, Deployment, Volume, Namespace, за винятком терміна node (вузол). Назви обʼєктів Kubernetes вважаємо за іменники ч.р. і відмінюємо за допомогою апострофа: Podʼів, Deploymentʼами.
* Для слів, що закінчуються на приголосний, у родовому відмінку однини використовуємо закінчення `-а`: Podʼа, Deploymentʼа. Слова, що закінчуються на голосний, не відмінюємо: доступ до `Service`, за допомогою `Namespace`. У множині використовуємо англійську форму: користуватися `Services`, спільні `Volumes`.
* Частовживані та усталені за межами Kubernetes слова перекладаємо українською і пишемо з малої літери (`label` → `мітка`). У випадку, якщо термін для означення обʼєкта Kubernetes вживається у своєму загальному значенні поза контекстом Kubernetes (`service` як службова програма, `deployment` як розгортання), перекладаємо його і пишемо з малої літери, наприклад: `service discovery` → `виявлення сервісу`, `continuous deployment` → `безперервне розгортання`.
* Складені слова вважаємо за власні назви та не перекладаємо (`LabelSelector`, `kube-apiserver`).
* Для перевірки закінчень слів у родовому відмінку однини (`-а/-я`, `-у/-ю`) використовуйте [онлайн словник](https://slovnyk.ua/). Якщо слова немає у словнику, визначте його відмінювання і далі відмінюйте за правилами. Докладніше [дивіться тут](https://pidruchniki.com/1948041951499/dokumentoznavstvo/vidminyuvannya_imennikiv).
* Для символу тире `―` використовуйте символ mdash «—» (`&mdash;`, U+2014) замість двох звичайних тире «–» (`&ndash;`, U+2013), чи дефісу «-» (U+002D)
* Апостроф: використовуйте літеру-апостроф `ʼ` (U+02BC) замість звичайного апострофа `'` (U+0027), чи правої одинарної лапки `’` (U+2019).

## Словник

💡 Наступний словник є лише рекомендаціями

English | Українська |
--- | --- |
addon | розширення |
application | застосунок |
backend | бекенд |
build | збирання (результат) |
build | збирати (процес) |
cache | кеш |
CLI | інтерфейс командного рядка |
cloud | хмара; хмарний провайдер |
containerized | контейнеризований |
continuous deployment | безперервне розгортання |
continuous development | безперервна розробка |
continuous integration | безперервна інтеграція |
contribute | робити внесок (до проєкту), допомагати (проєкту) |
contributor | контриб'ютор, учасник проєкту |
control plane | площина управління |
controller | контролер |
CPU | ЦП |
dashboard | дашборд, інфопанель, інформаційна панель |
data plane | площина даних |
default (by) | за умовчанням |
default settings | типові налаштування |
Deployment | Deployment |
deprecated | застарілий |
desired state | бажаний стан |
downtime | недоступність, простій |
ecosystem | сімейство проєктів (екосистема) |
endpoint | кінцева точка |
expose (a service) | відкрити доступ (до сервісу) |
fail | відмовити |
feature | компонент |
framework | фреймворк |
frontend | фронтенд |
image | образ |
Ingress | Ingress |
instance | інстанс, екземпляр |
issue | запит |
kube-proxy | kube-proxy |
kubelet | kubelet |
Kubernetes features | (функціональні) можливості Kubernetes |
label | мітка |
lifecycle | життєвий цикл |
logging | логування |
maintenance | обслуговування |
map | спроєктувати, зіставити, встановити відповідність |
master | master |
monitor | моніторити |
monitoring | моніторинг |
Namespace | Namespace |
network policy | мережева політика |
node | вузол |
orchestrate | оркеструвати |
output | вивід |
patch | патч |
Pod | Pod |
production | прод |
pull request | pull request |
release | реліз |
replica | репліка |
rollback | відкатування |
rolling update | послідовне оновлення |
rollout (new updates) | викатка (оновлень) |
run | запускати |
scale | масштабувати |
schedule | розподіляти (Pod'и по вузлах) |
Scheduler | Scheduler |
Secret | Secret |
Selector | Селектор |
self-healing | самозцілення |
self-restoring | самовідновлення |
Service | Service (як об'єкт Kubernetes) |
service | сервіс (як службова програма) |
service discovery | виявлення сервісу |
source code | вихідний код |
stateful app | застосунок зі станом |
stateless app | застосунок без стану |
task | завдання |
terminated | зупинений |
traffic | трафік |
VM (virtual machine) | ВМ (віртуальна машина) |
Volume | Volume |
workload | робоче навантаження |
YAML | YAML |

----

## Примітки
