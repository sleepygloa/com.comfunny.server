package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.AuthGrp;
import com.comfunny.server.proj.sys.domain.AuthGrpPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthMenuRepository extends JpaRepository<AuthGrp, AuthGrpPk> {

}
