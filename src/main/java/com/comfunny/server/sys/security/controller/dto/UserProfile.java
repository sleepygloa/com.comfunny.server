package com.comfunny.server.sys.security.controller.dto;

import com.comfunny.server.proj.sys.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile implements Serializable {
    private String name;
    private String email;
    private String provider;
    private String nickname;

    public User toUser(){
        return User.builder()
                .name(name)
                .email(email)
                .provider(provider)
                .nickname(nickname)
                .activated(true).pwdFailCnt(0).build();

    }
}
