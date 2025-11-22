package inf.unideb.hu.event_manager.service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventCreateDto {

    @NotBlank(message = "Title is required.")
    private String title;

    private String description;

    @NotNull(message = "Start date is required.")
    private String startDate;

    private String endDate;

    @NotBlank(message = "Location is required.")
    private String location;

    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be at least 1.")
    private Integer capacity;
}