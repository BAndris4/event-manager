package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.service.dto.UserMyDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService getUserDetailsService();
    UserMyDto getUserById(Long id);
    UserMyDto getCurrentUser();
}