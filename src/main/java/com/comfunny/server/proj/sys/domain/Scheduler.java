package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Setter
@Getter
@Table(name = "tb_sy_scheduler")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Scheduler extends BaseTimeEntity {

    @EmbeddedId
    private SchedulerPk schedulerPk;

    @Column(name = "SCHE_NM", length = 100)
    @NotNull
    private String scheNm;

    @Column(name = "SCHE_DESC", length = 500)
    private String scheDesc;

    @Column(name = "SCHE_CLASS_PATH", length = 200)
    private String scheClassPath;

    @Column(name = "SCHE_SEC", length = 50)
    private String scheSec;

    @Column(name = "SCHE_MIN", length = 50)
    private String scheMin;

    @Column(name = "SCHE_HOUR", length = 50)
    private String scheHour;

    @Column(name = "SCHE_DAY", length = 50)
    private String scheDay;

    @Column(name = "SCHE_MONTH", length = 50)
    private String scheMonth;

    @Column(name = "SCHE_YEAR", length = 50)
    private String scheYear;

    @Column(name = "USE_YN", length = 1)
    @ColumnDefault("'Y'")
    private String useYn;

    @Column(name = "DEL_YN", length = 1)
    @ColumnDefault("'N'")
    private String delYn;

}
