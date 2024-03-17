package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Scheduler;
import com.comfunny.server.proj.sys.domain.SchedulerPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerRepository extends JpaRepository<Scheduler, SchedulerPk>{

}
