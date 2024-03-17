package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserClient;
import com.comfunny.server.proj.sys.domain.UserClientPk;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserClientRepository extends JpaRepository<UserClient, UserClientPk> {

    @Query("select u from UserClient u where u.userClientPk.bizCd = :bizCd and u.userClientPk.userId = :userId and u.ordr = 1")
    Optional<UserClient> findByUserClientPkBizCdAndUserClientPkUserId(@Param("bizCd") String bizCd, @Param("userId") String userId);
}