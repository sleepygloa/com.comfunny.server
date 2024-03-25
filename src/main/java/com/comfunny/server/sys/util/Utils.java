package com.comfunny.server.sys.util;

import org.modelmapper.ModelMapper;

public class Utils {

    public static void setModelMapper(Object o1, Object o2){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(o1, o2);
    }
}
