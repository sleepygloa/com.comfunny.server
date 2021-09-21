package com.nambi.book.domain.ServerAPI;

import com.nambi.book.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigInteger;

@Getter
@NoArgsConstructor
@Entity
public class ConnectLog extends BaseTimeEntity {

    @Id
    private BigInteger idx;

    @Column
    private String id;

    @Builder
    public ConnectLog(String id) {
        this.id = id;
    }
}
