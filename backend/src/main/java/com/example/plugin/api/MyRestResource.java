package com.example.plugin.api;


import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/data")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyRestResource {

    private final MyPluginComponent pluginComponent;

    @Autowired
    public MyRestResource(MyPluginComponent pluginComponent) {
        this.pluginComponent = pluginComponent;
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