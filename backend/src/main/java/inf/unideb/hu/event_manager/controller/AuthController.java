package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.service.AuthService;
import inf.unideb.hu.event_manager.service.dto.LoginDto;
import inf.unideb.hu.event_manager.service.dto.RegistrationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationDto> register(@RequestBody RegistrationDto dto) {
        RegistrationDto registrationDto = authService.register(dto);
        return ResponseEntity.ok(registrationDto);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);
        return ResponseEntity.ok(token);
    }
}
