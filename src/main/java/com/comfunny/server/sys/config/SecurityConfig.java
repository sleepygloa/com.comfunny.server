package com.comfunny.server.sys.config;

import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.proj.sys.service.CustomUserDetailsService;
import com.comfunny.server.sys.security.*;
import com.comfunny.server.sys.security.controller.dto.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomUserDetailsService customUserDetailsService;


@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserDetailsService); // customUserDetailsService 등록
}

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers(
                        "/h2-console/**"
                        ,"/favicon.ico"
                );
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                //(CROS) 교차출처 리소스공유
                .cors()
                .and()

                //CSRF(Corss Site Request Forgery)(사이트 간 요청 위조 설정)
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf().disable()

                //인증허가에러처리
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // enable h2-console
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                //JWT 를 이용하려면 Session 설정 해제해야한다.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                //허용URL
                .and()
////                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .authorizeRequests()
//                .antMatchers("/api/**").hasRole(Role.USER.name())
//                .anyRequest().authenticated()
//                .antMatchers("/login/test").authenticated()
                .authorizeRequests()
                .antMatchers("/", "/test", "/css/**", "/images/**", "/js/**", "/h2-console/**","/login/**").permitAll()
//                .antMatchers("/","/login/**/**").permitAll()
                .antMatchers("/api/**")
                .hasRole(Role.USER.name())

                //JWT 검증
                .and()
                .apply(new JwtSecurityConfig(jwtTokenProvider))

                //로그아웃시
                .and()
                .logout().logoutSuccessUrl("/")

                //oauth2
                .and()
                .oauth2Login() //OAuth2 로그인 설정 시작점
//                .defaultSuccessUrl("/oauth/loginInfo", true) //OAuth2 성공시
                .successHandler(new MyAuthenticationSuccessHandler(jwtTokenProvider)) //인증에 성공하면 실행할 handler (redirect 시킬 목적)
                .userInfoEndpoint() //OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
                .userService(customOAuth2UserService); //OAuth2 로그인 성공 시, 작업을 진행할 MemberService
        ;
    }


    //CORS설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://sleepygloa.github.io");
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type")); //허용할 헤더
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //비밀번호 암호화를 위한 Encoder 설정
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}