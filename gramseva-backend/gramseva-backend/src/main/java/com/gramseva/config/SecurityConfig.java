package com.gramseva.config;

import com.gramseva.security.JWTAuthenticationFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf -> csrf.disable())

                // =================================================
                // CORS
                // =================================================

                .cors(cors -> {})

                // =================================================
                // SESSION
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth

                        // =========================================
                        // PUBLIC CITIZEN APIs
                        // =========================================

                        .requestMatchers(
                                "/api/user/register",
                                "/api/user/login",
                                "/api/user/check-aadhaar/**"
                        ).permitAll()

                        // =========================================
                        // PUBLIC OFFICER LOGIN
                        // =========================================

                        .requestMatchers(
                                "/api/auth/officer-login"
                        ).permitAll()

                        // =========================================
                        // TEMPORARY OFFICER CREATION
                        // =========================================

                        .requestMatchers(
                                "/api/officer-setup/department-head"
                        ).permitAll()

                        // =========================================
                        // OFFICER APIs
                        // =========================================

                        .requestMatchers(
                                "/api/officer/**"
                        ).hasRole("OFFICER")

                        // =========================================
                        // OTHER APIs
                        // =========================================

                        .anyRequest().permitAll()
                )

                // =================================================
                // JWT AUTHENTICATION FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}