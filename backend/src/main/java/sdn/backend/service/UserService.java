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
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입
    public void signup(LoginDto signupDto) {
        // 중복 아이디 체크
        if (userRepository.findByUsername(signupDto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());

        // DB 저장
        User user = new User(signupDto.getUsername(), encodedPassword);
        userRepository.save(user);
    }

    // 로그인
    public String login(LoginDto loginDto) {
        // 아이디 찾기
        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new RuntimeException("없는 아이디입니다."));

        // 비밀번호 비교
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        // 토큰 발급
        return jwtUtil.createToken(user.getUsername());
    }
}