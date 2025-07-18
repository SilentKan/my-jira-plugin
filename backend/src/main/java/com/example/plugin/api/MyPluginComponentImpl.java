package com.example.plugin.api;

import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;


import org.springframework.stereotype.Component;



@ExportAsService({MyPluginComponent.class})
@Component
public class MyPluginComponentImpl implements MyPluginComponent {


    public MyPluginComponentImpl() {
        System.out.println(">>> MyPluginComponentImpl создан");
    }

    @Override
    public String getData() {
        return "Hello from MyPluginComponent!";
    }
} 