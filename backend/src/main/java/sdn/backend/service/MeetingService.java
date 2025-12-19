package sdn.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sdn.backend.dto.MeetingCreateDto;
import sdn.backend.dto.MeetingResponseDto;
import sdn.backend.entity.Meeting;
import sdn.backend.entity.User;
import sdn.backend.repository.MeetingRepository;
import sdn.backend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final UserRepository userRepository;

    // 유저 생성 모임 조회
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getCreatedMeetings(String email) {
        return meetingRepository.findByCreatorEmail(email).stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }

    // 유저 참여 모임 조회
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getJoinedMeetings(String email) {
        return meetingRepository.findByParticipants_Email(email).stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }

    // 모임 참가 기능
    @Transactional
    public void joinMeeting(Long meetingId, String email) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("모임을 찾을 수 없습니다."));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        if (meeting.getParticipants().contains(user)) {
            throw new RuntimeException("이미 참여 중인 모임입니다.");
        }
        if (meeting.getCurrentMembers() >= meeting.getMaxMembers()) {
            throw new RuntimeException("인원이 가득 찼습니다.");
        }

        meeting.addParticipant(user);
    }

    // 핫한 모임 목록 가져오기
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getHotMeetings() {
        return meetingRepository.findTop8ByOrderByCurrentMembersDesc().stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }

    // 새로운 모임 목록 가져오기
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getNewMeetings() {
        return meetingRepository.findTop8ByOrderByIdDesc().stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }
    
    // 모임 생성
    @Transactional
    public void createMeeting(MeetingCreateDto dto, String email) {
        User creator = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("개설자 정보를 찾을 수 없습니다."));
        Meeting meeting = new Meeting(
            dto.getTitle(),
            dto.getCategory(),
            dto.getContent(),
            dto.getLocation(),
            dto.getMeetingDate(),
            dto.getMaxMembers(),
            dto.getImageUrl()
        );
        meeting.setCreator(creator);
        meetingRepository.save(meeting);
    }

    // 모임 수정
    @Transactional
    public void updateMeeting(Long meetingId, MeetingCreateDto dto, String email) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("모임을 찾을 수 없습니다."));

        // 권한 확인: 로그인한 유저가 개설자인지 확인
        if (!meeting.getCreator().getEmail().equals(email)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        // 엔티티 업데이트
        meeting.update(
            dto.getTitle(),
            dto.getCategory(),
            dto.getContent(),
            dto.getLocation(),
            dto.getMeetingDate(),
            dto.getMaxMembers(),
            dto.getImageUrl()
        );
    }

    // 모임 삭제
    @Transactional
    public void deleteMeeting(Long meetingId, String email) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("모임을 찾을 수 없습니다."));

        // 권한 확인
        if (!meeting.getCreator().getEmail().equals(email)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        meetingRepository.delete(meeting);
    }

    //모임 상세페이지
     @Transactional(readOnly = true)
    public MeetingResponseDto getMeetingDetail(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 모임이 존재하지 않습니다."));

        return new MeetingResponseDto(meeting);
    }
    
    //카테고리별 페이지
    @Transactional(readOnly = true)
    public List<MeetingResponseDto> getFilteredMeetings(String category, String type) {
        List<Meeting> meetings;

        if (category != null && type != null) {
            // 카테고리와 타입(정기/번개) 모두 선택된 경우
            if ("정규".equals(type)) {
                meetings = meetingRepository.findByCategoryAndMeetingDateIsNull(category);
            } else if("번개".equals(type)) {
                meetings = meetingRepository.findByCategoryAndMeetingDateIsNotNull(category);
            } else {
                meetings = meetingRepository.findAll();
            }
        } else if (category != null) {
            // 카테고리만 선택된 경우
            meetings = meetingRepository.findByCategory(category);
        } else if (type != null) {
            // 타입만 선택된 경우
            meetings = "정규".equals(type) ? 
                meetingRepository.findByMeetingDateIsNull() : 
                meetingRepository.findByMeetingDateIsNotNull();
        } else {
            // 전체 조회
            meetings = meetingRepository.findAll();
        }

        return meetings.stream()
                .map(MeetingResponseDto::new)
                .collect(Collectors.toList());
    }
}
