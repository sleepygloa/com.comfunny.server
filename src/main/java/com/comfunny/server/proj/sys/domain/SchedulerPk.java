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

@Setter
@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class SchedulerPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "BIZ_CD", length = 20)
    @NotBlank
    private String bizCd;

    @Column(name = "SCHE_SEQ", length = 11)
    @NotBlank
    private String scheSeq;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SchedulerPk that = (SchedulerPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(scheSeq, that.scheSeq);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, scheSeq);
    }
}
