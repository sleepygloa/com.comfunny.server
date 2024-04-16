package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.validator.constraints.pl.NIP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "tb_sy_user_cnn_log")
@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserCnnLog extends BaseTimeEntity {

    @EmbeddedId
    private UserCnnLogPk userCnnLogPk;
    /* userId */
    @Column private String userId;
    /* 로그코드 */
    @Column private String code;
    /* 로그관련 변수들 */
    @Column private String value;
    /* 접속 Device */
    @Column private String loginOs;
    /* 접속 IP */
    @Column private String loginIp;

    /* 기타공통점보 */
}
