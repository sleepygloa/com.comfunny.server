package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserPk;
import com.comfunny.server.proj.sys.domain.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, UserPk>{
    Optional<UserToken> findByUserPk(UserPk userPk);

    Optional<UserToken> findByRefreshToken(String refreshToken);
}
