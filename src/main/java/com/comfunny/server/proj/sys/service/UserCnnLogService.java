package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class UserCnnLogService extends CommonService {

    @Resource
    UserCnnLogRepository userCnnLogRepository;

}
