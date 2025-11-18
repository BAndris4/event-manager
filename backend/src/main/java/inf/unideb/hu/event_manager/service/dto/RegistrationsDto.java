package inf.unideb.hu.event_manager.service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RegistrationsDto {
    private Long id;
    private Long userId;
    private Long eventId;
    private LocalDateTime registeredAt;
}
