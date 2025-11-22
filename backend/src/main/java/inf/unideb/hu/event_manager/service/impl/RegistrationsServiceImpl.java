package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import inf.unideb.hu.event_manager.data.entity.RegistrationsEntity;
import inf.unideb.hu.event_manager.data.repository.EventRepository;
import inf.unideb.hu.event_manager.data.repository.RegistrationsRepository;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import inf.unideb.hu.event_manager.service.RegistrationsService;
import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;
import inf.unideb.hu.event_manager.service.mapper.RegistrationsMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationsServiceImpl implements RegistrationsService {

    private final RegistrationsRepository registrationsRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final RegistrationsMapper registrationsMapper;

    public RegistrationsServiceImpl(RegistrationsRepository registrationsRepository, UserRepository userRepository, EventRepository eventRepository, RegistrationsMapper registrationsMapper) {
        this.registrationsRepository = registrationsRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.registrationsMapper = registrationsMapper;
    }

    @Override
    public RegistrationsDto registerUserToEvent(Long userId, Long eventId) {
        if (registrationsRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new IllegalStateException("User already registered for this event.");
        }

        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found."));

        long currentRegistrations = registrationsRepository.countByEventId(eventId);
        if (currentRegistrations >= event.getCapacity()) {
            throw new IllegalStateException("The event has been reached the maximum number of registrations.");
        }

        RegistrationsEntity registrationsEntity = new RegistrationsEntity();
        registrationsEntity.setUser(userRepository.getReferenceById(userId));
        registrationsEntity.setEvent(eventRepository.getReferenceById(eventId));
        registrationsEntity.setRegisteredAt(LocalDateTime.now());

        return registrationsMapper.registrationsEntityToDto(registrationsRepository.save(registrationsEntity));
    }

    @Override
    public RegistrationsDto unregisterUserFromEvent(Long userId, Long eventId) {
        RegistrationsEntity registrationsEntity = registrationsRepository.findByUserIdAndEventId(userId, eventId);
        if (registrationsEntity == null) {
            throw new IllegalStateException("User no registered for this event.");
        }
        registrationsRepository.delete(registrationsEntity);
        return registrationsMapper.registrationsEntityToDto(registrationsEntity);
    }

    @Override
    public List<RegistrationsDto> getUserRegistrations(Long userId) {
        return registrationsMapper.registrationsEntityToDto(registrationsRepository.findAllByUserId(userId));
    }

    @Override
    public List<RegistrationsDto> getEventRegistrations(Long eventId) {
        return registrationsMapper.registrationsEntityToDto(registrationsRepository.findAllByEventId(eventId));
    }

    @Override
    public RegistrationsDto moveRegistration(Long id, Long newEventId) {

        RegistrationsEntity reg = registrationsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found with id: " + id));

        Long oldEventId = reg.getEvent().getId();
        Long userId = reg.getUser().getId();

        if (oldEventId.equals(newEventId)) {
            throw new IllegalStateException("User is already registered to this event.");
        }

        EventEntity newEvent = eventRepository.findById(newEventId)
                .orElseThrow(() -> new IllegalArgumentException("Target event not found: " + newEventId));

        if (registrationsRepository.existsByUserIdAndEventId(userId, newEventId)) {
            throw new IllegalStateException("User already registered to the target event.");
        }

        long current = registrationsRepository.countByEventId(newEventId);
        if (current >= newEvent.getCapacity()) {
            throw new IllegalStateException("The target event has reached its maximum capacity.");
        }

        reg.setEvent(newEvent);

        return registrationsMapper.registrationsEntityToDto(registrationsRepository.save(reg));
    }

}
