package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import inf.unideb.hu.event_manager.data.entity.EventStatus;
import inf.unideb.hu.event_manager.data.repository.EventRepository;
import inf.unideb.hu.event_manager.service.EventService;
import inf.unideb.hu.event_manager.service.dto.EventDto;
import inf.unideb.hu.event_manager.service.mapper.EventMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    private final EventMapper eventMapper;

    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    @Override
    public List<EventDto> getAllEvents() {
        return eventMapper.eventEntityToDto(eventRepository.findAll());
    }

    @Override
    public EventDto getEventById(Long id) {
        return eventMapper.eventEntityToDto(
                eventRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Event with id " + id + " not found!"))
        );
    }

    @Override
    public EventDto createEvent(EventDto dto) {
        EventEntity entity = eventMapper.eventDtoToEntity(dto);

        if (entity.getStatus() == null) {
            entity.setStatus(EventStatus.PLANNED);
        }

        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());

        return eventMapper.eventEntityToDto(eventRepository.save(entity));
    }


    @Override
    public EventDto updateEvent(Long id, EventDto dto) {
        EventEntity existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + id + " not found!"));

        existingEvent.setTitle(dto.getTitle());
        existingEvent.setDescription(dto.getDescription());
        existingEvent.setStartDate(dto.getStartDate());
        existingEvent.setEndDate(dto.getEndDate());
        existingEvent.setLocation(dto.getLocation());
        existingEvent.setCapacity(dto.getCapacity());
        if (dto.getStatus() == null) {
            existingEvent.setStatus(EventStatus.PLANNED);
        } else {
            existingEvent.setStatus(dto.getStatus());
        }
        existingEvent.setUpdatedAt(LocalDateTime.now());

        return eventMapper.eventEntityToDto(eventRepository.save(existingEvent));
    }

    @Override
    public EventDto deleteEvent(Long id) {
        EventEntity deletedEvent = eventRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Event with id " + id + " not found!"));
        eventRepository.deleteById(id);
        return eventMapper.eventEntityToDto(deletedEvent);
    }
}
