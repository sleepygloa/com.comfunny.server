package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.proj.sys.dto.Authority;
import com.comfunny.server.sys.security.controller.dto.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;

/**
 * Client To Server
 * */

//@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "username", length = 50)
    private String name;

    @Column(name = "user_email", length = 50)
    private String email;

    @Column(name = "provider", length = 50)
    private String provider;

    @Column(name = "username", length = 50, insertable = false, updatable = false)
    private String username;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "password", length = 100)
    private String password;




    public User update(String name, String email){
        this.name = name;
        this.email = email;
        return this;
    }
//
//    public String getRoleKey() {
//        return this.roles.getKey();
//    }
////    @Column(name = "biz_cd", length = 20)
////    private String bizCd; //회사코드
////
    @Column(name = "activated", length = 1)
    private boolean activated;
////
////    @Column(name = "nickname", length = 50)
////    private String nickname;
////
////    @Column(name = "password", length = 100)
////    private String password;
////
////
////    @Column(name = "user_no", length = 20)
////    private String userNo;
////
////    @Column(name = "user_phone", length = 13)
////    private String userPhone;
////
////
////    @Column(name = "user_position", length = 13)
////    private String userPosition;
////
    @Column(name = "roles", length = 13)
    private String roles;
////
    @Column(name = "pwd_fail_cnt", length = 11)
    @ColumnDefault("0")
    private long pwdFailCnt = 0;
////
////    @Column(name = "lately_try")
////    private LocalDateTime latelyTry;
////
////    @Column(name = "last_login_dt")
////    private LocalDateTime lastLoginDt;
////
////    @Column(name = "push_id", length = 20)
////    private String pushId;
////
////    @Column(name = "admin_yn", length = 1)
////    @ColumnDefault("'N'")
////    private String adminYn;
////
////    @Column(name = "user_join_dt", length = 50)
////    private String userJoinDt;
////
////    @Column(name = "pwd_chg_dt", length = 8)
////    private String pwdChgDt;
////
////    @Column(name = "user_lang_cd", length = 4)
////    private String userLangCd;
////
////    @Column(name = "user_country_cd", length = 4)
////    private String userCountryCd;
////
////    @Column(name = "printer_ip", length = 20)
////    private String printerIp;
////
////    @Column(name = "use_yn", length = 1)
////    @ColumnDefault("'Y'")
////
////    private String useYn;
////
////    @Column(name = "del_yn", length = 1)
////    @ColumnDefault("'N'")
////    private String delYn;
////
////
    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {
                    @JoinColumn(name = "id", referencedColumnName = "id")
            },
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;


    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(Role.USER.getKey()));
    }
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
