package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import inf.unideb.hu.event_manager.service.RegistrationsService;
import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationsController {

    private final RegistrationsService registrationsService;
    private final UserRepository userRepository;

    public RegistrationsController(RegistrationsService registrationsService,
                                   UserRepository userRepository) {
        this.registrationsService = registrationsService;
        this.userRepository = userRepository;
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nincs bejelentkezett felhasználó");
        }

        String email = auth.getName();
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Felhasználó nem található");
        }

        return user.getId();
    }

    @PostMapping("/{eventId}")
    public ResponseEntity<RegistrationsDto> registerUser(@PathVariable Long eventId) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(registrationsService.registerUserToEvent(userId, eventId));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<RegistrationsDto> unregisterUser(@PathVariable Long eventId) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(registrationsService.unregisterUserFromEvent(userId, eventId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<RegistrationsDto>> getMyRegistrations() {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(registrationsService.getUserRegistrations(userId));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<RegistrationsDto>> getEventRegistrations(@PathVariable Long eventId) {
        return ResponseEntity.ok(registrationsService.getEventRegistrations(eventId));
    }
}
