package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Domain;
import com.comfunny.server.proj.sys.domain.DomainPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<Domain, DomainPk>{

}
