package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Area;
import com.comfunny.server.proj.sd.domain.AreaPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area, AreaPk> {

}
