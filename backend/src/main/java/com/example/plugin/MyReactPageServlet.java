package com.example.plugin;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.templaterenderer.TemplateRenderer;
import com.atlassian.webresource.api.WebResourceManager;

import javax.inject.Inject;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * Сервлет-обёртка для React-страницы.
 * Задача: отдать минимальный HTML (через TemplateRenderer), подключить web-resources (CSS/JS),
 * и отрендерить контейнер для монтирования React.
 *
 * [DI] Зависимости получаем через @Inject + @ComponentImport — так Jira отдаёт «хостовые» сервисы.
 */
public class MyReactPageServlet extends HttpServlet {


    // Управляет подключением объявленных в atlassian-plugin.xml ресурсов (web-resource).
    private final WebResourceManager webResourceManager;

    // TemplateRenderer (Velocity/Soy) используется как «шаблонизатор-оболочка» для HTML.
    // Нужен, чтобы вывести $webResourceManager.getRequiredResources() и контейнер <div>.
    private final TemplateRenderer templateRenderer;



    // @ComponentImport говорит Spring Scanner-у: это сервис из контейнера Jira, не из нашего плагина.
    @Inject
    public MyReactPageServlet(@ComponentImport WebResourceManager webResourceManager,
                              @ComponentImport TemplateRenderer templateRenderer) {
        this.webResourceManager = webResourceManager;
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        // Отдаём HTML в UTF-8, чтобы не ловить кракозябры в Atlassian-шаблонах.
        resp.setContentType("text/html;charset=utf-8");

        // css тянес с помошью этого вызова.
        // данные будут тянуться из atlassian-plugin по ключю com.example.my-jira-plugin-backend
        // и по значению web-resource - split_my-plugin
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:split_my-plugin");

        //  Контекст шаблона: отдаём contextPath и сам webResourceManager.
        // contextPath — чтобы в шаблоне строить абсолютные пути, если нужно.
        // webResourceManager — чтобы в шаблоне вызвать getRequiredResources() (CSS/JS из web-resource).
        Map<String, Object> context = new HashMap<>();
        context.put("contextPath", req.getContextPath());
        context.put("webResourceManager", webResourceManager);

        // Рендерим HTML-оболочку (например, <div id="my-plugin-container"></div> внутри).
        // Шаблон должен вызвать $webResourceManager.getRequiredResources() — тогда подключатся и CSS, и JS бандла.
        // Дальше в бандле React выполнит window.initMyPlugin() и смонтируется в контейнер.
        templateRenderer.render("/templates/my-plugin.vm", context, resp.getWriter());
    }

}
