package com.example.plugin.api.dto;

import com.example.plugin.ao.MyRecord;

public class MyRecordDto {

    public int id;

    public String name;

    public int value;

    public static MyRecordDto from(MyRecord r) {
        MyRecordDto dto = new MyRecordDto();
        dto.id = r.getID();
        dto.name = r.getName();
        dto.value = r.getValue();
        return dto;
    }
}
