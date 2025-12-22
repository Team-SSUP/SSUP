package sdn.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") 
@Getter @Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
    private Long id;

    @Column(nullable = false, unique = true) // 아이디 중복 불가
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    public User(String email, String nickname, String password) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    // 수정: 닉네임
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    // 수정: 비밀번호
    public void updatePassword(String password) {
        this.password = password;
    }
}