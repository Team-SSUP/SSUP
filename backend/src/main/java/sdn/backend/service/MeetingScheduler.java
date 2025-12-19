package sdn.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import sdn.backend.entity.Meeting;
import sdn.backend.repository.MeetingRepository;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MeetingScheduler {

    private final MeetingRepository meetingRepository;

    // 1분마다 실행 (60000ms)
    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void deleteExpiredMeetings() {
        LocalDateTime now = LocalDateTime.now();
        
        // 만료된 번개모임 조회
        List<Meeting> expiredMeetings = meetingRepository.findByMeetingDateBefore(now);
        
        if (!expiredMeetings.isEmpty()) {
            meetingRepository.deleteAll(expiredMeetings);
            System.out.println(expiredMeetings.size() + "개의 만료된 번개모임이 자동으로 삭제되었습니다.");
        }
    }
}