package inf.unideb.hu.event_manager.service.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class RegistrationDto {
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String gender;
    private String email;
    private String phoneNumber;
    private String password;
}
