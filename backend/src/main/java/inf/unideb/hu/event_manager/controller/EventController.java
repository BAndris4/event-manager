package inf.unideb.hu.event_manager.controller;

import inf.unideb.hu.event_manager.data.repository.EventRepository;
import inf.unideb.hu.event_manager.service.EventService;
import inf.unideb.hu.event_manager.service.dto.EventCreateDto;
import inf.unideb.hu.event_manager.service.dto.EventDto;
import inf.unideb.hu.event_manager.service.dto.EventUpdateDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    final EventService eventService;
    private final EventRepository eventRepository;

    public EventController(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<EventDto> getEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<EventDto> postEvent(@RequestBody @Valid EventCreateDto eventDto) {
        if (eventDto.getEndDate() != null && eventDto.getEndDate().isBefore(eventDto.getStartDate())) {
            throw new IllegalStateException("A befejezés dátuma nem lehet korábbi, mint a kezdés dátuma.");
        }
        boolean exists = eventRepository.existsByTitle(eventDto.getTitle());
        if (exists) {
            throw new IllegalStateException("Már létezik esemény ezzel a címmel.");
        }
        EventDto created = eventService.createEvent(eventDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(
            @PathVariable Long id,
            @RequestBody @Valid EventUpdateDto dto
    ) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id, dto));
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