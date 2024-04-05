package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import com.comfunny.server.sys.dto.CommonDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto extends CommonDto {
    @Size(min = 3, max = 50)
    @NotNull
    private String userId;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;
    @NotNull
    @Size(min = 1, max = 20)
    private String nickname;
}
