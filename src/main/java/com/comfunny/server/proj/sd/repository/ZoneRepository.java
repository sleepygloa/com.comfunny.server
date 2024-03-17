package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.proj.sd.domain.ZonePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, ZonePk> {

}
