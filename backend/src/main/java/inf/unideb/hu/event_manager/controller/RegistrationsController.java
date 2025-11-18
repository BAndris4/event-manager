package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.service.RegistrationsService;
import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationsController {

    private final RegistrationsService registrationsService;

    public RegistrationsController(RegistrationsService registrationsService) {
        this.registrationsService = registrationsService;
    }

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((UserEntity) principal).getId();
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
