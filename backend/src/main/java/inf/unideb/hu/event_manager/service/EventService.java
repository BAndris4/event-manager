package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.EventDto;

import java.util.List;

public interface EventService {
    List<EventDto> getAllEvents();
    EventDto getEventById(Long id);
    EventDto createEvent(EventDto dto);
    EventDto updateEvent(Long id, EventDto dto);
    EventDto deleteEvent(Long id);
}
