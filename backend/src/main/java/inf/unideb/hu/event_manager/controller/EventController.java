package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.service.EventService;
import inf.unideb.hu.event_manager.service.dto.EventDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/init")
    public void init() {
        eventService.createEvent(EventDto.builder()
                .title("Pamkutya koncert")
                .startDate(LocalDateTime.of(2025, 11, 18, 12, 30))
                .build());
        eventService.createEvent(EventDto.builder()
                .title("Magyar - Izland válogatott meccs")
                .startDate(LocalDateTime.of(2025, 11, 21, 16, 00))
                .build());
        eventService.createEvent(EventDto.builder()
                .title("Azahriah koncert")
                .startDate(LocalDateTime.of(2026, 3, 12, 18, 00))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<EventDto> getEvents() {
        return eventService.getAllEvents();
    }

    @PostMapping
    public ResponseEntity<EventDto> postEvent(@RequestBody EventDto eventDto) {
        EventDto created = eventService.createEvent(eventDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestBody EventDto eventDto, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id, eventDto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EventDto> deleteEvent(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.deleteEvent(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
