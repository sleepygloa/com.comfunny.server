package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{
//    //로그인 확인
//    @EntityGraph(attributePaths = "authorities")
//    Optional<User> findOneWithAuthoritiesByUsername(String username);
//
//    Optional<User> findByUserPk(UserPk userPk);

    Optional<User> findByEmailAndProvider(String email, String provider);

}
