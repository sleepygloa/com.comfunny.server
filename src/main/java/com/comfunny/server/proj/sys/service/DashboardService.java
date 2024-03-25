package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.DashboardDao;
import com.comfunny.server.proj.sys.repository.DashboardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class DashboardService extends CommonService {

    @Resource
    private DashboardRepository dashboardRepository;

    @Resource
    private DashboardDao dashboardDao;


}
