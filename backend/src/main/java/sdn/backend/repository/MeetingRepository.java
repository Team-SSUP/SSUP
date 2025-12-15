package sdn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sdn.backend.entity.Meeting;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
    // 1. 최신순 조회 (ID 역순 = 최신순)
    List<Meeting> findTop4ByOrderByIdDesc();

    // 2. 핫한 모임 조회 (현재 인원이 많은 순서대로 4개)
    List<Meeting> findTop4ByOrderByCurrentMembersDesc();
}