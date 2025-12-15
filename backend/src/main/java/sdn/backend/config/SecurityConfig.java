package sdn.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import sdn.backend.service.UserService;
import sdn.backend.util.JwtUtil;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 필요한 객체 주입을 위해 필드 추가
    private final UserService userService;
    private final JwtUtil jwtUtil;

    // 생성자 주입 (Lombok @RequiredArgsConstructor가 있다면 생략 가능하지만 명시적으로 작성함)
    public SecurityConfig(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // 보안 필터 체인 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CSRF 보안 끄기
            .csrf(csrf -> csrf.disable())

            // CORS 설정 적용 
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 세션 끄기 
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // URL별 권한 설정
            .authorizeHttpRequests(auth -> auth
                // 로그인, 회원가입은 누구나 접속 가능
                .requestMatchers("/api/login", "/api/signup").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/meetings/**").permitAll() 
                // 그 외 모든 요청은 인증 필요
                .anyRequest().authenticated()
            )
            // ★ 여기에 필터 추가: UsernamePasswordAuthenticationFilter 앞에 JwtFilter를 실행해라
            .addFilterBefore(new JwtFilter(userService, jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CORS 설정
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