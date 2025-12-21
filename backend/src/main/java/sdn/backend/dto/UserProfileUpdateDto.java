package sdn.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserProfileUpdateDto {
    private String nickname;
    private String password; // 새 비밀번호 (변경 시에만 입력)
}