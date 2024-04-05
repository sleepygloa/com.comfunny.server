package com.comfunny.server.proj.sys.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user_authority")
@Getter
@Setter
@NoArgsConstructor
public class UserAuthority {

    @Id
    private Long id;
    @Column(name = "user_id", unique = false)
    private String userId;
    @Column(name = "authority_name", length = 50, unique = false)
    private String authorityName;

    @Builder
    public UserAuthority(Long id, String userId, String authorityName) {
        this.id = id;
        this.userId = userId;
        this.authorityName = authorityName;
    }
}
