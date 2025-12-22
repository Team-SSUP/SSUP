package sdn.backend.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sdn.backend.dto.MeetingCreateDto;
import sdn.backend.dto.MeetingResponseDto;
import sdn.backend.service.MeetingService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    // 통합 검색 및 필터링 API
    @GetMapping
    public List<MeetingResponseDto> getMeetings(
            @RequestParam(required = false) String category, // "운동", "스터디" 등
            @RequestParam(required = false) String type      // "regular" 또는 "instant"
    ) {
        return meetingService.getFilteredMeetings(category, type);
    }

    @GetMapping("/hot")
    public List<MeetingResponseDto> getHotMeetings() {
        return meetingService.getHotMeetings();
    }

    @GetMapping("/new")
    public List<MeetingResponseDto> getNewMeetings() {
        return meetingService.getNewMeetings();
    }

    // 모임 세부페이지
    @GetMapping("/{id}")
    public MeetingResponseDto getMeetingDetail(@PathVariable Long id) {
        return meetingService.getMeetingDetail(id);
    }

    // 모임 생성
    @PostMapping
    public String createMeeting(@RequestBody MeetingCreateDto dto, Principal principal) {
        String username = principal.getName();
        meetingService.createMeeting(dto, username);
        return "모임 생성 성공";
    }

    // 모임 수정
    @PutMapping("/{id}")
    public String updateMeeting(@PathVariable Long id, @RequestBody MeetingCreateDto dto, Principal principal) {
        meetingService.updateMeeting(id, dto, principal.getName());
        return "모임 수정 성공";
    }

    // 모임 삭제 
    @DeleteMapping("/{id}")
    public String deleteMeeting(@PathVariable Long id, Principal principal) {
        meetingService.deleteMeeting(id, principal.getName());
        return "모임 삭제 성공";
    }

    // 내가 만든 모임
    @GetMapping("/my/created")
    public List<MeetingResponseDto> getMyCreatedMeetings(Principal principal) {
        return meetingService.getCreatedMeetings(principal.getName());
    }

    // 내가 참여한 모임
    @GetMapping("/my/joined")
    public List<MeetingResponseDto> getMyJoinedMeetings(Principal principal) {
        return meetingService.getJoinedMeetings(principal.getName());
    }

    // 모임 참가 신청
    @PostMapping("/{id}/join")
    public String joinMeeting(@PathVariable Long id, Principal principal) {
        meetingService.joinMeeting(id, principal.getName());
        return "참가 성공";
    }

    // 검색 API
    @GetMapping("/search")
    public List<MeetingResponseDto> searchMeetings(@RequestParam String keyword) {
        return meetingService.searchMeetings(keyword);
    }
}