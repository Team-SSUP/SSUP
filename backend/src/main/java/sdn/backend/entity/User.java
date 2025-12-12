package sdn.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") // 실제 DB 테이블 이름
@Getter @Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 1, 2, 3... 자동 증가
    private Long id;

    @Column(nullable = false, unique = true) // 아이디 중복 불가
    private String username;

    @Column(nullable = false)
    private String password;

    // 생성자 추가 (나중에 편하게 쓰려고)
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}