package sdn.backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sdn.backend.entity.Meeting;
import sdn.backend.entity.User;

@Getter
@AllArgsConstructor
public class MeetingResponseDto {
    private Long id;
    private String title;
    private String category;
    private String content;
    private String location;
    private LocalDateTime date; 
    private Integer currentMembers;
    private Integer maxMembers;
    private String imageUrl;
    private List<ParticipantDto> participants;

    // Entity -> DTO 변환 메서드 (편의상 생성자로 처리)
    public MeetingResponseDto(Meeting meeting) {
        this.id = meeting.getId();
        this.title = meeting.getTitle();
        this.category = meeting.getCategory();
        this.content = meeting.getContent();
        this.location = meeting.getLocation();
        this.date = meeting.getMeetingDate();
        this.currentMembers = meeting.getCurrentMembers();
        this.maxMembers = meeting.getMaxMembers();
        this.imageUrl = meeting.getImageUrl();
        this.participants = meeting.getParticipants().stream()
                .map(ParticipantDto::new)
                .collect(Collectors.toList());
    }

    // [추가] 내부 클래스: 참여자 정보 (닉네임만 전달)
    @Getter
    public static class ParticipantDto {
        private Long id;
        private String nickname;

        public ParticipantDto(User user) {
            this.id = user.getId();
            this.nickname = user.getNickname();
        }
    }
}