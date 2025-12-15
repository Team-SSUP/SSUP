package sdn.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MeetingCreateDto {
    private String title;
    private String category;
    private String content; // 상세 내용
    private String location;
    private String meetingDate;
    private Integer maxMembers;
    private String imageUrl; // 프론트에서 만든 정적 지도 URL이 들어옵니다.
}