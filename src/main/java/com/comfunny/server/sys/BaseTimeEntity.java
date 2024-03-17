package com.comfunny.server.sys;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

    @Column(length = 20)
    public String inUserId;
    @Column(length = 20)
    public String upUserId;
    @CreatedDate
    private LocalDateTime inDt;
    @LastModifiedDate
    private LocalDateTime upDt;



}
