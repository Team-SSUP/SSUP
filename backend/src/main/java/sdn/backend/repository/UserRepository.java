package sdn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sdn.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 아이디로 회원 찾기
    Optional<User> findByUsername(String username);
}