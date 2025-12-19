package sdn.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @Column(nullable = true)
    private String meetingDate; // 모임 시간 (문자열로 간편하게 처리: "오늘 19:00")

    @Column(nullable = false)
    private Integer currentMembers; // 현재 인원

    @Column(nullable = false)
    private Integer maxMembers;     // 최대 인원

    @Column(length = 1000)
    private String imageUrl;    // 이미지 URL

    private LocalDateTime createdAt; // 생성일 (최신순 정렬용)


    // --- 유저 관계 추가 ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator; // 모임 개설자

    @ManyToMany
    @JoinTable(
        name = "meeting_participants",
        joinColumns = @JoinColumn(name = "meeting_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>(); // 참여자 목록

    // 모임 생성 시 개설자를 참여자로 자동 포함
    public void setCreator(User creator) {
        this.creator = creator;
        this.addParticipant(creator);
    }

    public void addParticipant(User user) {
        this.participants.add(user);
        this.currentMembers = this.participants.size();
    }

    // 모임 수정
    public void update(String title, String category, String location, String meetingDate, Integer maxMembers, String imageUrl) {
    this.title = title;
    this.category = category;
    this.location = location;
    this.meetingDate = meetingDate;
    this.maxMembers = maxMembers;
    this.imageUrl = imageUrl;
    }

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