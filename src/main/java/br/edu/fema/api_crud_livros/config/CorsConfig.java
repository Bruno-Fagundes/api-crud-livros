package br.edu.fema.api_crud_livros.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                                .allowedOriginPatterns(
                                                "http://localhost:3000")
                                .allowedMethods("GET", "POST", "PUT", "DELETE")
                                .allowedHeaders(
                                                "Origin",
                                                "Content-Type",
                                                "Accept",
                                                "Authorization",
                                                "X-Requested-With",
                                                "Access-Control-Request-Method",
                                                "Access-Control-Request-Headers")
                                .exposedHeaders(
                                                "Access-Control-Allow-Origin",
                                                "Access-Control-Allow-Credentials",
                                                "Authorization")
                                .allowCredentials(true)
                                .maxAge(3600);
        }
}