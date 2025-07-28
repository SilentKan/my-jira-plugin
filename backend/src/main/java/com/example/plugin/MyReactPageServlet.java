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

        // Подключаем нужный Web Resource
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:entrypoint-my-plugin");

        String html = """
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My React Page</title>
                %s
              </head>
              <body>
                <div id="my-plugin-container"></div>
                <script>
                  WRM.require('wr!com.example.my-jira-plugin-backend:entrypoint-my-plugin').then(function() {
                    require(['entrypoint-my-plugin'], function(mod) {
                      if (mod?.default) {
                        mod.default();
                      } else {
                        console.error('❌ No default export in module');
                      }
                    });
                  }).catch(function(err) {
                    console.error('❌ Failed to load web resources:', err);
                  });
                </script>
              </body>
            </html>
            """.formatted(webResourceManager.getRequiredResources(UrlMode.RELATIVE));

        resp.getWriter().write(html);
    }
}
