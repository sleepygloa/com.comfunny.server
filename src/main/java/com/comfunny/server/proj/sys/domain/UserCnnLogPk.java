package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Getter
@Setter
@Embeddable
@AllArgsConstructor
public class UserCnnLogPk implements Serializable {

    /* 로그날짜 */
    @Column private String yyyymmdd;
    /* 로그날짜시퀀스 */
    @Column private long seq;
    public UserCnnLogPk() {
        // 날짜를 YYYYMMDD 형식으로 설정
        this.yyyymmdd = LocalDate.now().toString().replace("-", "");
    }
}
