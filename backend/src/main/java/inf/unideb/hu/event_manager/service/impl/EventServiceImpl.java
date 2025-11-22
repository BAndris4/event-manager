package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import inf.unideb.hu.event_manager.data.repository.EventRepository;
import inf.unideb.hu.event_manager.data.repository.RegistrationsRepository;
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

    private final RegistrationsRepository registrationsRepository;

    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper, RegistrationsRepository registrationsRepository) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
        this.registrationsRepository = registrationsRepository;
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<EventDto> dtos = eventMapper.eventEntityToDto(eventRepository.findAll());

        dtos.forEach(dto -> {
            dto.setRegistered(registrationsRepository.countByEventId(dto.getId()));
        });
        return dtos;
    }

    @Override
    public EventDto getEventById(Long id) {
        EventDto dto = eventMapper.eventEntityToDto(eventRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Event with id " + id + " not found!")));
        dto.setRegistered(registrationsRepository.countByEventId(id));
        return dto;
    }

    @Override
    public EventDto createEvent(EventDto dto) {

        if (dto.getEndDate() != null && dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new IllegalStateException("End date must be after start date.");
        }

        EventEntity entity = eventMapper.eventDtoToEntity(dto);

        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());

        return eventMapper.eventEntityToDto(eventRepository.save(entity));
    }


    @Override
    public EventDto updateEvent(Long id, EventDto dto) {

        if (dto.getEndDate() != null && dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new IllegalStateException("End date must be after start date.");
        }

        EventEntity existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + id + " not found!"));

        existingEvent.setTitle(dto.getTitle());
        existingEvent.setDescription(dto.getDescription());
        existingEvent.setStartDate(dto.getStartDate());
        existingEvent.setEndDate(dto.getEndDate());
        existingEvent.setLocation(dto.getLocation());
        existingEvent.setCapacity(dto.getCapacity());
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
