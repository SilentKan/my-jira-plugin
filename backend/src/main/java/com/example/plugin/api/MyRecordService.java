package com.example.plugin.api;

import com.example.plugin.ao.MyRecord;

public interface MyRecordService {

    MyRecord create(String name, int value);

    MyRecord[] all();

    void delete(int id);
}
