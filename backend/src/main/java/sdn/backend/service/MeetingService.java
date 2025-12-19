package sdn.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sdn.backend.dto.MeetingCreateDto;
import sdn.backend.dto.MeetingResponseDto;
import sdn.backend.entity.Meeting;
import sdn.backend.repository.MeetingRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;

    // 핫한 모임 목록 가져오기
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getHotMeetings() {
        return meetingRepository.findTop4ByOrderByCurrentMembersDesc().stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }

    // 새로운 모임 목록 가져오기
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getNewMeetings() {
        return meetingRepository.findTop4ByOrderByIdDesc().stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void createMeeting(MeetingCreateDto dto) {
        Meeting meeting = new Meeting(
            dto.getTitle(),
            dto.getCategory(),
            dto.getContent(),
            dto.getLocation(),
            dto.getMeetingDate(),
            dto.getMaxMembers(),
            dto.getImageUrl()
        );
        // Entity에 content 필드가 없다면 추가하거나 생성자 수정 필요
        // 현재는 예시로 content는 생략하거나 Entity 업데이트 필요
        
        meetingRepository.save(meeting);
    }

    //모임 상세페이지
     @Transactional(readOnly = true)
    public MeetingResponseDto getMeetingDetail(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 모임이 존재하지 않습니다."));

        return new MeetingResponseDto(meeting);
    }
}
