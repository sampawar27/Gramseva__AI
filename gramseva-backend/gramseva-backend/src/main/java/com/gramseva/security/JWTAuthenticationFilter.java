package com.gramseva.security;

import com.gramseva.entity.User;
import com.gramseva.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JWTAuthenticationFilter
        extends OncePerRequestFilter {


    @Autowired
    private JwtService jwtService;


    @Autowired
    private UserRepository userRepository;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        // =================================================
        // GET AUTHORIZATION HEADER
        // =================================================

        String authorizationHeader =
                request.getHeader("Authorization");


        // =================================================
        // NO TOKEN
        // =================================================

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =================================================
        // EXTRACT TOKEN
        // =================================================

        String token =
                authorizationHeader.substring(7);


        try {

            // =============================================
            // VALIDATE TOKEN
            // =============================================

            if (!jwtService.isTokenValid(token)) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =============================================
            // EXTRACT OFFICER ID
            // =============================================

            String officerId =
                    jwtService.extractOfficerId(token);


            // =============================================
            // FIND OFFICER
            // =============================================

            User user =
                    userRepository
                            .findByOfficerId(
                                    officerId
                            )
                            .orElse(null);


            if (user == null) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =============================================
            // CHECK ROLE
            // =============================================

            if (user.getRole() == null ||
                    !user.getRole()
                            .name()
                            .equals("OFFICER")) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =============================================
            // CHECK STATUS
            // =============================================

            if (user.getStatus() == null ||
                    !user.getStatus()
                            .name()
                            .equals("ACTIVE")) {

                filterChain.doFilter(
                        request,
                        response
                );

                return;
            }


            // =============================================
            // AUTHENTICATION
            // =============================================

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(

                            officerId,

                            null,

                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_OFFICER"
                                    )
                            )
                    );


            // =============================================
            // SECURITY CONTEXT
            // =============================================

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(
                            authentication
                    );


        } catch (Exception e) {

            SecurityContextHolder
                    .clearContext();
        }


        // =================================================
        // CONTINUE
        // =================================================

        filterChain.doFilter(
                request,
                response
        );
    }
}