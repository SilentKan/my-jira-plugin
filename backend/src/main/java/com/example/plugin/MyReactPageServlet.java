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

        // Подключаем WRM и web‑resource нашего плагина
        webResourceManager.requireResource("com.atlassian.plugins.atlassian-plugins-webresource-rest:web-resource-manager");
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
                // Загружаем web‑resource (css/js) через WRM
                WRM.require('com.example.my-jira-plugin-backend:entrypoint-my-plugin')
                  .then(function() {
                    // После загрузки web‑resource импортируем AMD‑модуль,
                    // имя которого совпадает с entry‑point ('my-plugin')
                    require(['my-plugin'], function(mod) {
                      if (mod && typeof mod.default === 'function') {
                        mod.default();
                      } else if (typeof mod === 'function') {
                        mod();
                      } else {
                        console.error('Cannot initialize module:', mod);
                      }
                    });
                  })
                  .catch(function(err) {
                    console.error('Failed to load web resources:', err);
                  });
              </script>
            </body>
            </html>
            """.formatted(webResourceManager.getRequiredResources(UrlMode.RELATIVE));

        resp.getWriter().write(html);
    }
}
