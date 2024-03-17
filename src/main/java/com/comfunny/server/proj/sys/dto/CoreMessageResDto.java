package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.Message;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoreMessageResDto {

    private String bizCd;
    private String msgCd;
    private String langCd;
    private String msgTxt;
    private String useYn;

    public CoreMessageResDto(Message entity){
        this.bizCd = entity.getMessagePk().getBizCd();
        this.msgCd = entity.getMessagePk().getMsgCd();
        this.langCd = entity.getMessagePk().getLangCd();
        this.msgTxt = entity.getMsgTxt();
        this.useYn = entity.getUseYn();
    }
}
