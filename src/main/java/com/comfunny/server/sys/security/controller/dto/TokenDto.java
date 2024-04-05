package com.comfunny.server.sys.security.controller.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    private String accessToken;
    private float accessTokenDt;
    private String refreshToken;
    private float refreshTokenDt;
}