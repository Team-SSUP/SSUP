package sdn.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 비밀키 (임시용)
    private static final String SECRET_KEY = "sdn_project_secret_key_play_ground_student_community";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // 토큰 생성 메서드
    public String createToken(String username) {
        long expirationTime = 1000 * 60 * 60; // 1시간 유효

        return Jwts.builder()
                .setSubject(username) // 토큰 주인
                .setIssuedAt(new Date()) // 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) // 서명
                .compact();
    }

    public String getUsername(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}