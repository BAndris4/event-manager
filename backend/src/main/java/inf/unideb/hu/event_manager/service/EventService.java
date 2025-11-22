package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.EventCreateDto;
import inf.unideb.hu.event_manager.service.dto.EventDto;
import inf.unideb.hu.event_manager.service.dto.EventUpdateDto;

import java.util.List;

public interface EventService {
    List<EventDto> getAllEvents();
    EventDto getEventById(Long id);
    EventDto createEvent(EventCreateDto dto);
    EventDto updateEvent(Long id, EventUpdateDto dto);
    EventDto deleteEvent(Long id);
}
