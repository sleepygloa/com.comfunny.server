package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserToken;
import com.comfunny.server.proj.sys.domain.UserTokenPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, UserTokenPk>{


    /** UserId 와 EndDt 로 찾기
     * 1. 정상적인 로그인시 EndDt 가 없음
     * 2. 신규토큰 생성시 기존 EndDt 1건을 현재시각으로 세팅하고 신규로 만듬
     * */
    Optional<UserToken> findByUserTokenPkUserIdAndEndDt(String userId, String endDt);


    Optional<UserToken> findByAccessToken(String accessToken);

}
