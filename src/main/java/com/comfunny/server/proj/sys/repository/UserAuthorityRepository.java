package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.dto.UserAuthority;
import com.comfunny.server.proj.sys.dto.UserAuthorityPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAuthorityRepository extends JpaRepository<UserAuthority, UserAuthorityPk>{
}
