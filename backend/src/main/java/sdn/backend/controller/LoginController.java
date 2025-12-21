package sdn.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sdn.backend.dto.LoginDto;
import sdn.backend.dto.SignupDto;
import sdn.backend.entity.User;
import sdn.backend.service.UserService;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    // 1. 회원가입 API
    @PostMapping("/signup")
    public String signup(@RequestBody SignupDto signupDto) {
        userService.signup(signupDto);
        return "회원가입 성공!"; // 간단한 문자열 반환
    }

    // 2. 로그인 API
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginDto loginDto) {
        String token = userService.login(loginDto);
        // 로그인한 유저의 정보를 가져옵니다.
        User user = userService.getUserByEmail(loginDto.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("nickname", user.getNickname()); // 프론트의 res.data.nickname과 매칭
        return response;
    }

    @GetMapping("/me")
    public Map<String, String> getMe(Principal principal) {
        // 1. Principal이 null인지 먼저 체크합니다.
        if (principal == null) {
            throw new RuntimeException("인증 정보가 없습니다.");
        }

        // 2. Principal.getName()을 통해 이메일을 가져옵니다.
        User user = userService.getUserByEmail(principal.getName());
        
        Map<String, String> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("nickname", user.getNickname());
        return response;
    }
}