package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.UserCnnLog;
import com.comfunny.server.proj.sys.domain.UserCnnLogPk;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserCnnLogRepository extends JpaRepository<UserCnnLog, UserCnnLogPk>{
    @Query(value = "SELECT IFNULL(MAX(seq), 0) + 1 FROM tb_sy_user_cnn_log WHERE yyyymmdd = :yyyymmdd", nativeQuery = true)
    Long getMaxSequenceForToday(@Param("yyyymmdd") String yyyymmdd);
}
