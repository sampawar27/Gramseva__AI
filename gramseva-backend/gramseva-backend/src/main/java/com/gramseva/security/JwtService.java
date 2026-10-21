package com.gramseva.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "GramSevaSuperSecretKeyForJwtAuthentication2026VerySecureKey";


    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(
                            StandardCharsets.UTF_8
                    )
            );


    // =====================================================
    // GENERATE TOKEN
    // =====================================================

    public String generateToken(
            String officerId,
            String role) {

        return Jwts.builder()

                .subject(officerId)

                .claim(
                        "role",
                        role
                )

                .issuedAt(
                        new Date()
                )

                // 8 hours
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 8 * 60 * 60 * 1000
                        )
                )

                .signWith(key)

                .compact();
    }


    // =====================================================
    // EXTRACT OFFICER ID
    // =====================================================

    public String extractOfficerId(
            String token) {

        return getClaims(token)
                .getSubject();
    }


    // =====================================================
    // EXTRACT ROLE
    // =====================================================

    public String extractRole(
            String token) {

        return getClaims(token)
                .get(
                        "role",
                        String.class
                );
    }


    // =====================================================
    // VALIDATE TOKEN
    // =====================================================

    public boolean isTokenValid(
            String token) {

        try {

            Claims claims =
                    getClaims(token);

            return claims
                    .getExpiration()
                    .after(
                            new Date()
                    );

        } catch (Exception e) {

            return false;
        }
    }


    // =====================================================
    // GET CLAIMS
    // =====================================================

    private Claims getClaims(
            String token) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }
}