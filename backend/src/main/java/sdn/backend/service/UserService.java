package sdn.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sdn.backend.dto.LoginDto;
import sdn.backend.dto.SignupDto;
import sdn.backend.dto.UserProfileUpdateDto;
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
    public void signup(SignupDto signupDto) {
        // 중복 아이디 체크
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());

        // DB 저장
        User user = new User(signupDto.getEmail(), signupDto.getNickname() ,encodedPassword);
        userRepository.save(user);
    }

    // 로그인
    public String login(LoginDto loginDto) {
        // 아이디 찾기
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("없는 이메일입니다."));

        // 비밀번호 비교
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        // 토큰 발급
        return jwtUtil.createToken(user.getEmail());
    }

    @Transactional
    public void updateProfile(String email, UserProfileUpdateDto updateDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 1. 닉네임 업데이트 (값이 있을 경우에만)
        if (updateDto.getNickname() != null && !updateDto.getNickname().isBlank()) {
            user.updateNickname(updateDto.getNickname());
        }

        // 2. 비밀번호 업데이트 (값이 있을 경우에만 암호화하여 저장)
        if (updateDto.getPassword() != null && !updateDto.getPassword().isBlank()) {
            user.updatePassword(passwordEncoder.encode(updateDto.getPassword()));
        }
    }
}