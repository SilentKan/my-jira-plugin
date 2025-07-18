package com.example.plugin.api;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Named
public class MyRestResource {

    private final MyPluginComponent pluginComponent;

    //@Autowired
    @Inject
    public MyRestResource(MyPluginComponent pluginComponent) {
        this.pluginComponent = pluginComponent;
    }

    @GET
    @Path("/data")
    public Response getData() {
        return Response.ok(pluginComponent.getData()).build();
    }

    @POST
    @Path("/data")
    public Response postData(String value) {
        return Response.ok().build();
    }
}