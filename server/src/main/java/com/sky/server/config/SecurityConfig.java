package com.sky.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Value("${app.pepper:#{null}}")
    private String pepper;

    public String getPepper() {
        if (pepper == null) {
            throw new IllegalStateException("Pepper value is not set");
        }
        return pepper;
    }
}
