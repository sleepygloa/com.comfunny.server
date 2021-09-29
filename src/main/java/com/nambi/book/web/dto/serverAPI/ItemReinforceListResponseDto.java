package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.ItemReinforce;
import lombok.Getter;


@Getter
public class ItemReinforceListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String grade;
    private float success;
    private float fail;
    private float bigFail;
    private int requestItemCount;
    private int requestSafetyItemCount;
    private int price;
    private int addValue;;

    public ItemReinforceListResponseDto(ItemReinforce entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.grade = entity.getGrade();
        this.success = entity.getSuccess();
        this.fail = entity.getFail();
        this.bigFail = entity.getBigFail();
        this.requestItemCount = entity.getRequestItemCount();
        this.requestSafetyItemCount = entity.getRequestSafetyItemCount();
        this.price = entity.getPrice();
        this.addValue = entity.getAddValue();
    }
}
