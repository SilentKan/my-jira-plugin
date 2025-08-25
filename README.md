Демонстративный плагин под jira 10. react + atlaskit + vm


Сборка

1. собрать клиентскую часть с помощью npm run build
   это сгенерирует необходимые файлы в ресурсах в папках css и js.

2. собрать бек с помощью mvn clean package.
   для того что бы так сделать необходимо в ide указать путь к мавену sdk.
   так же указать пусть до settings и репозитория.

   для сборки плагина необходимо установить atlassian sdk 9.1.1

3. полученный jar устанавливаем в jira 10.

Описание.

Демо проект показывает работы плагина в jira 10, с актуальными зависимостями и стеком react + atlaskit + vm
После его установки в админке, в левом меню появится пункт ReatUI - My react page.
при клике на которую внутри jira откроетася форма с выбором вкладок,
где будет продемонстрирован базовый функционал: 
такой как иньекция зависимостей в Local counter
рест запрос в Rest
обращение с базой данных в AO Records
передача переменных на клиент через vm.

передача через vm. примечание.
В одном web-resource можно объявить несколько <data> (каждый со своим key и своим провайдером), 
либо разбить на несколько web-resources и требовать их по месту. Доставать на клиенте их надо по ключу вида
<pluginKey>:<webResourceKey>.<dataKey> и каждый ключ claim-ится один раз

Пример: несколько провайдеров в одном ресурсе
<web-resource key="split_my-plugin">
<resource type="download" name="js/my-plugin.js" location="js/my-plugin.js"/>
<data key="bootstrap" class="com.example.plugin.web.MyBootstrapDataProvider"/>
<data key="analytics" class="com.example.plugin.web.AnalyticsProvider"/>
<data key="featureFlags" class="com.example.plugin.web.FeatureFlagsProvider"/>
</web-resource>

в vm в скриптах подключение выглядит следующим образом 
<script>
  require(['wrm/data'], function(WRMData){
    var PK = 'com.example.my-jira-plugin-backend:split_my-plugin.';
    window.APP_BOOTSTRAP    = WRMData.claim(PK + 'bootstrap')    || {};
    window.APP_ANALYTICS    = WRMData.claim(PK + 'analytics')    || {};
    window.APP_FEATUREFLAGS = WRMData.claim(PK + 'featureFlags') || {};
    window.initMyPlugin && window.initMyPlugin();
  });
</script>

в реакте пробрасываем в нужные компоненты

const boot   = (window as any).APP_BOOTSTRAP   ?? {};
const stats  = (window as any).APP_ANALYTICS   ?? {};
const flags  = (window as any).APP_FEATUREFLAGS?? {};

<Routes>
  <Route path="/view-wrm-bootstrap" element={<WrmBootstrapPage bootstrap={boot} />} />
  <Route path="/view-stats"         element={<StatsPage analytics={stats} />} />
  <Route path="/view-flags"         element={<FlagsPage flags={flags} />} />
</Routes>

Советы:

Держите WRM-данные маленькими (bootstrap/флаги/контекст). 
Тяжёлые и динамичные данные — через REST. WRM.data.claim специально одноразовый, 
чтобы большие объекты не висели в памяти.

Если набор нужен только на конкретной странице - вынесите его в отдельный web-resource 
и требуйте его только там, чтобы не раздувать HTML всех страниц.