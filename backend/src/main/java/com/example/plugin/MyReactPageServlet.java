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

        // Подключаем Web Resource по ключу из atlassian-plugin.xml
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:my-plugin");

        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>\n")
            .append("<html>\n")
            .append("  <head>\n")
            .append("    <meta charset=\"UTF-8\">\n")
            .append("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n")
            .append("    <title>My React Page</title>\n")
            .append("    ").append(webResourceManager.getRequiredResources(UrlMode.RELATIVE)).append("\n")
            .append("  </head>\n")
            .append("  <body>\n")
            .append("    <div id=\"my-plugin-container\"></div>\n")
            .append("    <script>\n")
            .append("      // Дожидаемся загрузки WRM\n")
            .append("      (function initApp() {\n")
            .append("        if (window.WRM) {\n")
            .append("          WRM.require(['wr!com.example.my-jira-plugin-backend:my-plugin'])\n")
            .append("            .then(function() {\n")
            .append("              console.log('✅ React app loading...');\n")
            .append("            })\n")
            .append("            .catch(function(error) {\n")
            .append("              console.error('❌ Error loading React app:', error);\n")
            .append("            });\n")
            .append("        } else {\n")
            .append("          setTimeout(initApp, 100);\n")
            .append("        }\n")
            .append("      })();\n")
            .append("    </script>\n")
            .append("  </body>\n")
            .append("</html>");

        resp.getWriter().write(html.toString());
    }
}
