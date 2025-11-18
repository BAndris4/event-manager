package inf.unideb.hu.event_manager.service.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class LoginDto {
    private String email;
    private String password;
}
