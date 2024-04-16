package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.proj.sys.dto.Authority;
import com.comfunny.server.sys.security.controller.dto.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;
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

    @Column(name = "activated", length = 1)
    private boolean activated;

    @Column(name = "use_yn", length = 1)
    @ColumnDefault("'Y'")
    private String useYn;

    @Column(name = "del_yn", length = 1)
    @ColumnDefault("'N'")
    private String delYn;

    public User update(String name, String email){
        this.name = name;
        this.email = email;
        return this;
    }

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
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
