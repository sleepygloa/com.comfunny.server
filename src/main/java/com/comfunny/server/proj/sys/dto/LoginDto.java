package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import com.comfunny.server.sys.dto.CommonDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Client To Server
 * */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto extends CommonDto {
    @Size(min = 3, max = 100)
    @NotNull
    private String bizCd;
    @Size(min = 3, max = 100)
    @NotNull
    private String userId;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    private String loginOs;

}
