package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserCnnLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserCnnLogRepository extends JpaRepository<UserCnnLog, String>{
}
