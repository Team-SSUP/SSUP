package sdn.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sdn.backend.dto.LoginDto;
import sdn.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    // 1. 회원가입 API
    @PostMapping("/signup")
    public String signup(@RequestBody LoginDto signupDto) {
        userService.signup(signupDto);
        return "회원가입 성공!"; // 간단한 문자열 반환
    }

    // 2. 로그인 API
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginDto loginDto) {
        String token = userService.login(loginDto);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }
}