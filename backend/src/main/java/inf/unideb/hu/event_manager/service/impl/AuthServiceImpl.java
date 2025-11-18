package inf.unideb.hu.event_manager.service.impl;

import inf.unideb.hu.event_manager.data.entity.RoleEntity;
import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.RoleRepository;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import inf.unideb.hu.event_manager.service.AuthService;
import inf.unideb.hu.event_manager.service.dto.LoginDto;
import inf.unideb.hu.event_manager.service.dto.RegistrationDto;
import inf.unideb.hu.event_manager.service.mapper.UserMapper;
import inf.unideb.hu.event_manager.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Override
    public RegistrationDto register(RegistrationDto dto) {
        if (userRepository.findByEmail(dto.getEmail()) != null) {
            throw new IllegalStateException("Email already taken");
        }
        UserEntity userEntity = userMapper.registrationDtoToEntity(dto);
        userEntity.setPassword(passwordEncoder.encode(dto.getPassword()));

        RoleEntity role = roleRepository.findByRoleName("AUTHENTICATED_USER");
        if (role == null) {
          role = new RoleEntity();
          role.setRoleName("AUTHENTICATED_USER");
          roleRepository.save(role);
        }
        userEntity.setRole(role);

        userRepository.save(userEntity);

        RegistrationDto result = userMapper.registrationEntityToDto(userEntity);
        result.setPassword(null);
        return result;
    }

    @Override
    public String login(LoginDto dto) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        UserEntity userEntity = userRepository.findByEmail(dto.getEmail());
        return tokenService.generateToken(userEntity);
    }
}
