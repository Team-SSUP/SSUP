package sdn.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sdn.backend.entity.Meeting;

import java.time.LocalDateTime;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
    // 최신순 조회 (ID 역순 = 최신순)
    List<Meeting> findTop8ByOrderByIdDesc();

    // 핫한 모임 조회 (현재 인원이 많은 순서대로 8개)
    List<Meeting> findTop8ByOrderByCurrentMembersDesc();
    
    // 검색용 메서드 (제목 또는 내용에 keyword가 포함된 경우)
    List<Meeting> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword);

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
    List<Meeting> findByCreatorEmail(String email);

    // 유저가 참여 중인 모임 찾기
    List<Meeting> findByParticipants_Email(String email);

    // 현재 시간보다 이전이면서 null이 아닌(번개모임) 모임 찾기
    List<Meeting> findByMeetingDateBefore(LocalDateTime now);
}