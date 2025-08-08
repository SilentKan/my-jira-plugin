package com.example.plugin.api;

import com.example.plugin.ao.MyRecord;
import com.example.plugin.api.dto.MyRecordDto;


import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;

@Path("/records")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MyRecordResource {

    private final MyRecordService service;

    @Inject
    public MyRecordResource(MyRecordService service) {
        this.service = service;
    }

    @GET
    public Response getAll() {
        var list = Arrays.stream(service.all())
                .map(com.example.plugin.api.dto.MyRecordDto::from)
                .toArray(com.example.plugin.api.dto.MyRecordDto[]::new);
        return Response.ok(list).build();
    }

    @POST
    public Response create(com.example.plugin.api.dto.MyRecordDto dto) {
        var r = service.create(dto.name, dto.value);
        return Response.status(Response.Status.CREATED)
                .entity(com.example.plugin.api.dto.MyRecordDto.from(r))
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") int id) {
        service.delete(id);
        return Response.noContent().build();
    }
}
