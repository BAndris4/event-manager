package inf.unideb.hu.event_manager.service.dto;

import inf.unideb.hu.event_manager.data.entity.EventStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private Integer capacity;
    private EventStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
