package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Domain;
import com.comfunny.server.proj.sys.domain.DomainPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomainRepository extends JpaRepository<Domain, DomainPk>{

    //공통영역//특정언어 전체조회
    @Query("select d from Domain d where d.domainPk.bizCd = :bizCd and d.domainPk.langCd = :langCd")
    List<Domain> findAllByDomainPkBizCdAndDomainPkLangCd(@Param("bizCd") String bizCd, @Param("langCd") String langCd);

}
