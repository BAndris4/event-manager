package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import inf.unideb.hu.event_manager.service.UserService;
import inf.unideb.hu.event_manager.service.dto.UserMyDto;
import inf.unideb.hu.event_manager.service.mapper.UserMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetailsService getUserDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                UserEntity user = userRepository.findByEmail(email);

                if (user == null) {
                    throw new UsernameNotFoundException("No user found with email: " + email);
                }

                return user;
            }
        };
    }

    @Override
    public UserMyDto getUserById(Long id) {
        return userMapper.userMyEntityToDto(userRepository.findById(id).orElse(null));
    }

    @Override
    public UserMyDto getCurrentUser() {
        String email =
                org.springframework.security.core.context.SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userMapper.userMyEntityToDto(userRepository.findByEmail(email));
    }
}
