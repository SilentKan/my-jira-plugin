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
        MyRecord[] records = service.all();
        return Response.ok(Arrays.stream(records)
                        .map(r -> String.format("Name: %s, Value: %d", r.getName(), r.getValue()))
                        .toArray())
                .build();
    }

    @POST
    public Response create(MyRecordDto dto) {
        MyRecord r = service.create(dto.name, dto.value);
        return Response.ok("Created: " + r.getName()).build();
    }
}
