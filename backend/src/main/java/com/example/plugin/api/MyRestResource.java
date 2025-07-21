package com.example.plugin.api;


import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/data")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyRestResource {

    private final MyPluginComponent pluginComponent;

    @Inject
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