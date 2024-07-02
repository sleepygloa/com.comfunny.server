package com.comfunny.server.proj.ib.repository;

import com.comfunny.server.proj.ib.domain.Inbound;
import com.comfunny.server.proj.ib.domain.InboundPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InboundRepository extends JpaRepository<Inbound, InboundPk> {

}
