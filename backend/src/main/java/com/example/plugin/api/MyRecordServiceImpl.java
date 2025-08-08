package com.example.plugin.api;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.export.ExportAsService;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.example.plugin.ao.MyRecord;
import org.springframework.stereotype.Component;
import javax.inject.Inject;

@ExportAsService({MyRecordService.class})
@Component
public class MyRecordServiceImpl implements MyRecordService {

    private final ActiveObjects ao;

    @Inject
    public MyRecordServiceImpl(@ComponentImport ActiveObjects ao) {
        this.ao = ao;
    }

    @Override
    public MyRecord create(String name, int value) {
        return ao.executeInTransaction(() -> {
            MyRecord record = ao.create(MyRecord.class);
            record.setName(name);
            record.setValue(value);
            record.save();
            return record;
        });
    }

    @Override
    public MyRecord[] all() {
        return ao.find(MyRecord.class);
    }

    @Override
    public void delete(int id) {
        ao.executeInTransaction(() -> {
            MyRecord r = ao.get(MyRecord.class, id);
            if (r != null) {
                ao.delete(r);
            }
            return null;
        });
    }
}
