package com.example.plugin;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.webresource.api.UrlMode;
import com.atlassian.webresource.api.WebResourceManager;


import javax.inject.Inject;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class MyReactPageServlet extends HttpServlet {

    private final WebResourceManager webResourceManager;

    @Inject
    public MyReactPageServlet(@ComponentImport WebResourceManager webResourceManager) {
        this.webResourceManager = webResourceManager;
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html;charset=utf-8");

        webResourceManager.requireResource("com.example.my-jira-plugin-backend:my-plugin-resources");
        String resourceTags = webResourceManager.getRequiredResources(UrlMode.RELATIVE);

        String html = """
        <html>
          <head>
            <meta charset="UTF-8">
            <title>My React Page</title>
            %s
          </head>
          <body>
            <div id="my-plugin-container"></div>
          </body>
        </html>
        """.formatted(resourceTags);

        resp.getWriter().write(html);
    }




/*    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html;charset=utf-8");
        resp.getWriter().write("<html><body><h1>Hello from raw servlet!</h1></body></html>");
    }*/



}
