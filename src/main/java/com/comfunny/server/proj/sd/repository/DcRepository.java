package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.proj.sd.domain.DcPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DcRepository extends JpaRepository<Dc, DcPk> {

}
