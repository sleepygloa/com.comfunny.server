package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.AuthUser;
import com.comfunny.server.proj.sys.domain.AuthUserPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, AuthUserPk> {

}
