package com.example.provider;

import com.atlassian.json.marshal.Jsonable;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.user.UserManager;
import com.atlassian.webresource.api.data.WebResourceDataProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;
import java.util.Map;

public class MyBootstrapDataProvider implements WebResourceDataProvider {
    private final UserManager userManager;
    private final ObjectMapper mapper;

    @Inject
    public MyBootstrapDataProvider(@ComponentImport UserManager userManager) {
        this.userManager = userManager;
        this.mapper = new ObjectMapper();
        // Критично: не закрывать Writer
        this.mapper.getFactory().disable(JsonGenerator.Feature.AUTO_CLOSE_TARGET);
    }

    @Override
    public Jsonable get() {
        final Map<String, Object> payload = Map.of(
                "message", "Привет из WRM Data Provider!",
                "user", userManager.getRemoteUser() != null ? userManager.getRemoteUser().getUsername() : null
        );
        return writer -> mapper.writeValue(writer, payload); // writer останется открыт
    }
}
