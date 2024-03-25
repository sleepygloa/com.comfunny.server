package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Message;
import com.comfunny.server.proj.sys.domain.MessagePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, MessagePk>{

    //공통영역//특정언어 전체조회
    @Query("select d from Message d where d.messagePk.bizCd = :bizCd and d.messagePk.langCd = :langCd")
    List<Message> findAllByMessagePkBizCdAndMessagePkLangCd(@Param("bizCd") String bizCd, @Param("langCd") String langCd);

}
