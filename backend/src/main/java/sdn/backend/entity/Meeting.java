package sdn.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "meetings")
@Getter @Setter
@NoArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;       // 모임 제목

    @Column(nullable = false)
    private String category;    // 카테고리 (운동, 스터디 등)

    @Column(nullable = false)
    private String content;     //모임소개

    @Column(nullable = false)
    private String location;    // 장소 (정왕동 체육관)

    @Column(nullable = false)
    private String meetingDate; // 모임 시간 (문자열로 간편하게 처리: "오늘 19:00")

    @Column(nullable = false)
    private Integer currentMembers; // 현재 인원

    @Column(nullable = false)
    private Integer maxMembers;     // 최대 인원

    @Column(length = 1000)
    private String imageUrl;    // 이미지 URL

    private LocalDateTime createdAt; // 생성일 (최신순 정렬용)

    // 생성자
    public Meeting(String title, String category, String content, String location, String meetingDate, Integer maxMembers, String imageUrl) {
        this.title = title;
        this.category = category;
        this.content=content;
        this.location = location;
        this.meetingDate = meetingDate;
        this.currentMembers = 1; // 생성 시 1명(본인)부터 시작
        this.maxMembers = maxMembers;
        this.imageUrl = imageUrl;
        this.createdAt = LocalDateTime.now();
    }
}