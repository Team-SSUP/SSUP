package sdn.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. 비밀번호 암호화 도구 등록 (BCrypt)
    // 이게 있어야 UserService에서 passwordEncoder를 쓸 수 있습니다.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. 보안 필터 체인 설정 (핵심 설정)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // (1) CSRF 보안 끄기 (API 서버는 안 씀)
            .csrf(csrf -> csrf.disable())

            // (2) CORS 설정 적용 (프론트엔드와 통신 위함)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // (3) 세션 끄기 (JWT 쓸 거니까 STATELESS로 설정)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // (4) URL별 권한 설정
            .authorizeHttpRequests(auth -> auth
                // 로그인, 회원가입은 누구나 접속 가능
                .requestMatchers("/api/login", "/api/signup").permitAll()
                // 그 외 모든 요청은 인증(로그인) 필요
                .anyRequest().authenticated()
            );

        return http.build();
    }

    // 3. CORS 설정 (프론트엔드 3000번 포트 허용)
    // WebConfig 대신 여기서 한 번에 처리하는 게 시큐리티단에서 더 확실합니다.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 프론트엔드 주소 허용 (localhost:3000, localhost:5173 등)
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
        
        // 허용할 HTTP 메서드
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 허용할 헤더
        configuration.setAllowedHeaders(List.of("*"));
        
        // 쿠키나 인증 정보를 포함할지
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}