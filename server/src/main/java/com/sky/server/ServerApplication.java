package com.sky.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@EnableScheduling
@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				String allowedUrl = "http://localhost:3000";
//				String[] paths = {
//						"/create",
//						"/login",
//						"/prodSession/{token}"
//				};
//
//				Arrays.stream(paths).forEach(path -> {
//					registry.addMapping(path).allowedOrigins(allowedUrl);
//				});
//
//				registry.addMapping("/create").allowedOrigins("http://localhost:3000");
//			}
//		};
//	}
}
