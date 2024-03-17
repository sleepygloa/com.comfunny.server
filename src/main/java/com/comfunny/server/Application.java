package com.comfunny.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

//@EnableJpaAuditing
@SpringBootApplication
@Slf4j
public class Application extends SpringBootServletInitializer {
    public static void main(String[] args){
        SpringApplicationBuilder springApplicationBuilder = new SpringApplicationBuilder(Application.class);
        SpringApplication springApplication = springApplicationBuilder.build();
        springApplication.run(args);
    }

}
