package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;

import java.util.List;

public interface RegistrationsService {
    RegistrationsDto registerUserToEvent(Long userId, Long eventId);
    RegistrationsDto unregisterUserFromEvent(Long userId, Long eventId);
    List<RegistrationsDto> getUserRegistrations(Long userId);
    List<RegistrationsDto> getEventRegistrations(Long eventId);
    RegistrationsDto moveRegistration(Long id, Long eventId);
    RegistrationsDto deleteRegistration(Long id);
}
