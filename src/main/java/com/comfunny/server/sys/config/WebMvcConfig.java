package com.comfunny.server.sys.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Slf4j
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private HandlerInterceptor authInterceptor;

//    @Bean
//    public ParamsArgumentResolver paramsArgumentResolver(){
//        return new ParamsArgumentResolver();
//    }

//    https://backtony.github.io/spring/2021-12-02-spring-mvc-1/
    // 정적 파일의 경로를 매핑한다.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		WebMvcConfigurer.super.addResourceHandlers(registry);
//		addResourceHandlers(registry);
        registry.addResourceHandler("/**").addResourceLocations("/resources/");
    }

    /**
     * 인터셉터
     * */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        log.debug("=[WebMvcConfig] [addInterceptors]===============================================================");
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
//                .excludePathPatterns("/board") // 해당 경로는 인터셉터가 가로채지 않는다.

        ;
    }

    /**
     * 크로스 도메인
     * 3000 : 리액트
     * */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("https://sleepygloa.github.io")
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
                ;
    }
}
