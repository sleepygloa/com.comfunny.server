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

}
