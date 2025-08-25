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

    private final WebResourceManager webResourceManager;
    private final TemplateRenderer templateRenderer;

    @Inject
    public MyReactPageServlet(@ComponentImport WebResourceManager webResourceManager,
                              @ComponentImport TemplateRenderer templateRenderer) {
        this.webResourceManager = webResourceManager;
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        resp.setContentType("text/html;charset=utf-8");
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:split_my-plugin");

        Map<String, Object> context = new HashMap<>();
        context.put("contextPath", req.getContextPath());
        context.put("webResourceManager", webResourceManager);

        templateRenderer.render("/templates/my-plugin.vm", context, resp.getWriter());
    }

}
