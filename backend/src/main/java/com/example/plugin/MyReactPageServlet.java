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

        // Загружаем WRM-теги, чтобы css подтянулся
        webResourceManager.requireResource("com.example.my-jira-plugin-backend:split_my-plugin");

        String html = """
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="decorator" content="atl.admin">
    <meta name="admin.active.section" content="react-ui-section">
    <meta name="admin.active.tab" content="react-ui-item">
    <title>My Plugin</title>
    %s
  </head>
  <body>
    <section class="aui-page-panel">
      <header class="aui-page-header">
        <div class="aui-page-header-inner">
          <div class="aui-page-header-main">
            <h2>My Plugin Admin Page</h2>
          </div>
        </div>
      </header>

      <div class="aui-page-panel-content">
        <div id="my-plugin-container"></div>
      </div>
    </section>

    <script src="%s"></script>
    <script>window.initMyPlugin();</script>
  </body>
</html>
""".formatted(
                webResourceManager.getRequiredResources(UrlMode.RELATIVE),
                req.getContextPath() + "/download/resources/com.example.my-jira-plugin-backend:split_my-plugin/js/my-plugin.js"
        );


        resp.getWriter().write(html);
    }

}
