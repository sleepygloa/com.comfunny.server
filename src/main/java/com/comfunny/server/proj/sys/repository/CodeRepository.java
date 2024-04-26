package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import com.comfunny.server.proj.sys.domain.CodePk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface CodeRepository extends JpaRepository<Code, CodePk> {

    Page<Code> findAllByCodePkBizCdAndCodePkCodeGrpCd(String bizCd, String codeGrpCd, Pageable var1);

    Optional<Code> findAllByCodePkBizCdAndCodePkCodeGrpCd(String bizCd, String codeGrpCd);

}
