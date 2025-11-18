package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.LoginDto;
import inf.unideb.hu.event_manager.service.dto.RegistrationDto;

public interface AuthService {

    RegistrationDto register(RegistrationDto dto);
    String login(LoginDto dto);
}