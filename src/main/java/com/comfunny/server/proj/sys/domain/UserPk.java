package com.comfunny.server.proj.sys.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Objects;

/**
 * Client To Server
 * */
@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserPk implements Serializable {
    private static final long serialVersionUID = 1L;


    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //사용자ID

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPk userPk = (UserPk) o;
        return Objects.equals(userId, userPk.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
}
