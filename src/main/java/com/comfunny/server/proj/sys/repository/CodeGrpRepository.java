package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.CodeGrp;
import com.comfunny.server.proj.sys.domain.CodeGrpPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeGrpRepository extends JpaRepository<CodeGrp, CodeGrpPk> {

}
