package sdn.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sdn.backend.dto.LoginDto;
import sdn.backend.entity.User;
import sdn.backend.repository.UserRepository;
import sdn.backend.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // SecurityConfig에서 등록한 암호화 도구
    private final JwtUtil jwtUtil;

    // 1. 회원가입 기능 (New!)
    public void signup(LoginDto signupDto) {
        // (1) 중복 아이디 체크
        if (userRepository.findByUsername(signupDto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        // (2) 비밀번호 암호화 (보안 필수!)
        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());

        // (3) DB에 저장
        User user = new User(signupDto.getUsername(), encodedPassword);
        userRepository.save(user);
    }

    // 2. 로그인 기능
    public String login(LoginDto loginDto) {
        // 아이디 찾기
        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new RuntimeException("없는 아이디입니다."));

        // 암호화된 비밀번호 비교 (matches 사용)
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        // 토큰 발급
        return jwtUtil.createToken(user.getUsername());
    }
}