package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.service.UserService;
import inf.unideb.hu.event_manager.service.dto.UserMyDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/my")
    public ResponseEntity<UserMyDto> getMyUser() {
        UserMyDto user = userService.getCurrentUser();

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserMyDto> getUserById(@PathVariable Long id) {
        UserMyDto user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<UserMyDto>> getUsersByIds(@RequestBody List<Long> ids) {
        return ResponseEntity.ok(userService.getUsersByIds(ids));
    }

}
