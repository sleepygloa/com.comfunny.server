package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.proj.sys.dto.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @EmbeddedId
    private UserPk userPk;

    @Column(name = "biz_cd", length = 20)
    @NotBlank
    private String bizCd; //회사코드

    @Column(name = "activated", length = 1)
    private boolean activated;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "user_no", length = 20)
    private String userNo;

    @Column(name = "user_phone", length = 13)
    private String userPhone;

    @Column(name = "user_email", length = 50)
    private String userEmail;

    @Column(name = "user_position", length = 13)
    private String userPosition;

    @Column(name = "pwd_fail_cnt", length = 11)
    @ColumnDefault("0")
    private long pwdFailCnt = 0;

    @Column(name = "lately_try")
    private LocalDateTime latelyTry;

    @Column(name = "last_login_dt")
    private LocalDateTime lastLoginDt;

    @Column(name = "push_id", length = 20)
    private String pushId;

    @Column(name = "admin_yn", length = 1)
    @ColumnDefault("'N'")
    private String adminYn;

    @Column(name = "user_join_dt", length = 50)
    private String userJoinDt;

    @Column(name = "pwd_chg_dt", length = 8)
    private String pwdChgDt;

    @Column(name = "user_lang_cd", length = 4)
    private String userLangCd;

    @Column(name = "user_country_cd", length = 4)
    private String userCountryCd;

    @Column(name = "printer_ip", length = 20)
    private String printerIp;

    @Column(name = "use_yn", length = 1)
    @ColumnDefault("'Y'")

    private String useYn;

    @Column(name = "del_yn", length = 1)
    @ColumnDefault("'N'")
    private String delYn;





























    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
            },
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

}