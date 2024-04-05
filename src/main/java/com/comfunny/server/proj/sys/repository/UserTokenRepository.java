package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, String>{
    Optional<UserToken> findByUserId(String userId);

    Optional<UserToken> findByRefreshToken(String refreshToken);
}
