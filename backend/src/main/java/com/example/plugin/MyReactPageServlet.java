package com.example.plugin;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MyReactPageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html;charset=utf-8");
        resp.getWriter().write("""
            <html>
              <head>
                <meta charset="utf-8">
                <title>My React Page</title>
                <script src="/download/resources/com.example.my-plugin:entrypoint-my-plugin/my-plugin.js"></script>
              </head>
              <body>
                <div id="my-plugin-container"></div>
              </body>
            </html>
        """);
    }
}
