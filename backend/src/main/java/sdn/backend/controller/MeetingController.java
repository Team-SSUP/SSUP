package sdn.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sdn.backend.dto.MeetingCreateDto;
import sdn.backend.dto.MeetingResponseDto;
import sdn.backend.service.MeetingService;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @GetMapping("/hot")
    public List<MeetingResponseDto> getHotMeetings() {
        return meetingService.getHotMeetings();
    }

    @GetMapping("/new")
    public List<MeetingResponseDto> getNewMeetings() {
        return meetingService.getNewMeetings();
    }

    @PostMapping
    public String createMeeting(@RequestBody MeetingCreateDto dto) {
        // 실제로는 로그인한 유저 정보도 받아야 하지만, 1차 구현에서는 생략하거나 JWT에서 추출
        meetingService.createMeeting(dto);
        return "모임 생성 성공";
    }
}