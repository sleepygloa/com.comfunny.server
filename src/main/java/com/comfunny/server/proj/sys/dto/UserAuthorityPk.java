package com.comfunny.server.proj.sys.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthorityPk implements Serializable {

    @Column(name = "user_id", unique = false)
    private String userId;
    @Column(name = "authority_name", length = 50, unique = false)
    private String authorityName;


}
