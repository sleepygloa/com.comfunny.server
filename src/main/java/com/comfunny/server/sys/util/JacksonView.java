package com.comfunny.server.sys.util;

import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.Map;

public class JacksonView extends MappingJackson2JsonView {

    @Override
    protected Object filterModel(Map<String, Object> model) {
        Object result = super.filterModel(model);
        if(model.size() == 1){
            return model.values().toArray()[0];
        }
        return result;
    }
}