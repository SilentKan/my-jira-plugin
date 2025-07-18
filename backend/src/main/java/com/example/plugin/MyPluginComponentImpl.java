package com.example.plugin;

import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.example.plugin.api.MyPluginComponent;


import javax.inject.Named;

@Named
@ExportAsService({MyPluginComponent.class})
public class MyPluginComponentImpl implements MyPluginComponent {
    @Override
    public String getData() {
        return "Hello from MyPluginComponent!";
    }
} 