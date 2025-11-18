package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import inf.unideb.hu.event_manager.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
