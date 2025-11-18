package inf.unideb.hu.event_manager.service.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class UserResponseDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
}
