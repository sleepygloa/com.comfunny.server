package com.nambi.book.domain.ServerAPI;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class ItemReinforce {

    @Id
    private int idx;

    @Column
    private String code;
    @Column
    private String name;
    @Column
    private String grade;
    @Column
    private float success;
    @Column
    private float fail;
    @Column
    private float bigFail;
    @Column
    private int requestItemCount;
    @Column
    private int requestSafetyItemCount;
    @Column
    private int price;
    @Column
    private int addValue;;

    @Builder
    public ItemReinforce(int idx, String code, String name, String grade, float success, float fail, float bigFail, int requestItemCount, int requestSafetyItemCount, int price, int addValue) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.grade = grade;
        this.success = success;
        this.fail = fail;
        this.bigFail = bigFail;
        this.requestItemCount = requestItemCount;
        this.requestSafetyItemCount = requestSafetyItemCount;
        this.price = price;
        this.addValue = addValue;
    }
}
