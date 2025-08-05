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

        // css тянес с помошью этого вызова.
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:split_my-plugin");

        Map<String, Object> context = new HashMap<>();
        context.put("contextPath", req.getContextPath());
        context.put("webResourceManager", webResourceManager);

        templateRenderer.render("/templates/my-plugin.vm", context, resp.getWriter());
    }

}
