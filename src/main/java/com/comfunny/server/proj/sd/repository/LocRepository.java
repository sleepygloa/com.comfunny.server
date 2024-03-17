package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Loc;
import com.comfunny.server.proj.sd.domain.LocPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocRepository extends JpaRepository<Loc, LocPk> {

}
