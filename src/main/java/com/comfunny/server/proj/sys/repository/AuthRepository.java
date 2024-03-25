package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.AuthMenu;
import com.comfunny.server.proj.sys.domain.AuthMenuPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<AuthMenu, AuthMenuPk> {

}
