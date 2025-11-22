package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;

import java.util.List;

public interface RegistrationsService {
    public RegistrationsDto registerUserToEvent(Long userId, Long eventId);
    public RegistrationsDto unregisterUserFromEvent(Long userId, Long eventId);
    public List<RegistrationsDto> getUserRegistrations(Long userId);
    public List<RegistrationsDto> getEventRegistrations(Long eventId);
    public RegistrationsDto moveRegistration(Long id, Long eventId);
}
