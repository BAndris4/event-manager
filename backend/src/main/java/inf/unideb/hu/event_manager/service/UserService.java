package inf.unideb.hu.event_manager.service;

import inf.unideb.hu.event_manager.service.dto.UserMyDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService getUserDetailsService();
    UserMyDto getUserById(Long id);
    UserMyDto getCurrentUser();
    List<UserMyDto> getUsersByIds(List<Long> ids);
}