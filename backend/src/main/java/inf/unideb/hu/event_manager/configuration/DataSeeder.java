package inf.unideb.hu.event_manager.configuration;

import inf.unideb.hu.event_manager.data.entity.RoleEntity;
import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.RoleRepository;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedData() {
        return args -> {

            RoleEntity userRole = roleRepository.findByRoleName("ROLE_USER");
            if (userRole == null) {
                userRole = new RoleEntity();
                userRole.setRoleName("ROLE_USER");
                roleRepository.save(userRole);
                System.out.println("Created role: ROLE_USER");
            }

            RoleEntity adminRole = roleRepository.findByRoleName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = new RoleEntity();
                adminRole.setRoleName("ROLE_ADMIN");
                roleRepository.save(adminRole);
                System.out.println("Created role: ROLE_ADMIN");
            }

            UserEntity existingUser = userRepository.findByEmail("user@example.com");
            if (existingUser == null) {
                UserEntity user = new UserEntity();
                user.setFirstName("John");
                user.setLastName("Doe");
                user.setEmail("user@user.com");
                user.setPassword(passwordEncoder.encode("user"));
                user.setRole(userRole);
                userRepository.save(user);

                System.out.println("Seeded USER: user@user.com / user");
            }

            UserEntity existingAdmin = userRepository.findByEmail("admin@admin.com");
            if (existingAdmin == null) {
                UserEntity admin = new UserEntity();
                admin.setFirstName("Admin");
                admin.setLastName("Master");
                admin.setEmail("admin@admin.com");
                admin.setPassword(passwordEncoder.encode("admin"));
                admin.setRole(adminRole);
                userRepository.save(admin);

                System.out.println("Seeded ADMIN: admin@admin.com / admin");
            }
        };
    }
}
