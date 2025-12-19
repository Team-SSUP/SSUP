package sdn.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sdn.backend.entity.Meeting;

@Getter
@AllArgsConstructor
public class MeetingResponseDto {
    private Long id;
    private String title;
    private String category;
    private String content;
    private String location;
    private String date; // frontend props: date
    private Integer currentMembers;
    private Integer maxMembers;
    private String imageUrl;

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
    }
}