package com.example.plugin.api;


import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.stereotype.Component;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/data")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyRestResource {

    private final MyPluginComponent pluginComponent;

    public MyRestResource() {
        this.pluginComponent = ComponentAccessor.getOSGiComponentInstanceOfType(MyPluginComponent.class);
    }

    @GET
    public Response getData() {
        return Response.ok(pluginComponent.getData()).build();
    }

    @POST
    public Response postData(String value) {
        return Response.ok().build();
    }
}