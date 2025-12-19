package sdn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sdn.backend.entity.Meeting;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
    // 1. 최신순 조회 (ID 역순 = 최신순)
    List<Meeting> findTop8ByOrderByIdDesc();

    // 2. 핫한 모임 조회 (현재 인원이 많은 순서대로 4개)
    List<Meeting> findTop8ByOrderByCurrentMembersDesc();

    // 카테고리별 필터링
    List<Meeting> findByCategory(String category);

    // 정기모임 조회 (meetingDate가 null인 경우)
    List<Meeting> findByMeetingDateIsNull();

    // 번개모임 조회 (meetingDate가 null이 아닌 경우)
    List<Meeting> findByMeetingDateIsNotNull();

    // 복합 필터링 (카테고리 + 정기/번개 선택 시)
    List<Meeting> findByCategoryAndMeetingDateIsNull(String category);
    List<Meeting> findByCategoryAndMeetingDateIsNotNull(String category);

    // 유저가 생성한 모임 찾기
    List<Meeting> findByCreatorUsername(String username);

    // 유저가 참여 중인 모임 찾기
    List<Meeting> findByParticipants_Username(String username);

}