package sdn.backend.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import sdn.backend.dto.UserProfileUpdateDto;
import sdn.backend.service.UserService;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 프로필 통합 수정 (닉네임, 비밀번호 동시 처리)
    @PutMapping("/update")
    public String updateProfile(@RequestBody UserProfileUpdateDto updateDto, Principal principal) {
        // principal.getName()은 현재 로그인된 사용자의 이메일을 반환합니다.
        userService.updateProfile(principal.getName(), updateDto);
        return "프로필 정보가 성공적으로 수정되었습니다.";
    }
}
