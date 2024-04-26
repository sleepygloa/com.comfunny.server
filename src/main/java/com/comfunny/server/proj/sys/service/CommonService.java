package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;

@Slf4j
public class CommonService {
    @Resource
    protected UserCnnLogRepository userCnnLogRepository;
}
