package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserDc;
import com.comfunny.server.proj.sys.domain.UserDcPk;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDcRepository extends JpaRepository<UserDc, UserDcPk> {
    @Query("select u from UserDc u where u.userDcPk.bizCd = :bizCd and u.userDcPk.userId = :userId and u.ordr = 1")
    Optional<UserDc> findByUserDcPkBizCdAndUserDcPkUserId(@Param("bizCd") String bizCd, @Param("userId") String userId);
}