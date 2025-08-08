package com.example.plugin.ao;

import net.java.ao.Entity;
import net.java.ao.Preload;

@Preload
public interface MyRecord extends Entity {

    String getName();
    void setName(String name);

    int getValue();
    void setValue(int value);


}
