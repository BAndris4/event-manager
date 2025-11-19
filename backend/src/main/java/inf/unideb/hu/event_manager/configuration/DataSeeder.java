package inf.unideb.hu.event_manager.configuration;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import inf.unideb.hu.event_manager.data.entity.RoleEntity;
import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.data.repository.EventRepository;
import inf.unideb.hu.event_manager.data.repository.RoleRepository;
import inf.unideb.hu.event_manager.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EventRepository eventRepository;

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

            EventEntity workshop = eventRepository.findByTitle("Java Spring Boot Workshop");
            if (workshop == null) {
                workshop = new EventEntity();
                workshop.setTitle("Java Spring Boot Workshop");
                workshop.setDescription("Kezdő és haladó Spring Boot technikák.");
                workshop.setLocation("Debreceni Egyetem Informatikai Kar");
                workshop.setStartDate(LocalDateTime.of(2026, 2, 15, 10, 0));
                workshop.setEndDate(LocalDateTime.of(2026, 2, 15, 16, 0));
                workshop.setCapacity(50);
                workshop.setCreatedAt(LocalDateTime.now());
                eventRepository.save(workshop);

                System.out.println("Seeded event: Java Spring Boot Workshop");
            }

            EventEntity retro = eventRepository.findByTitle("Retro Gamer Kiállítás");
            if (retro == null) {
                retro = new EventEntity();
                retro.setTitle("Retro Gamer Kiállítás");
                retro.setDescription("Ikonikus játékkonzolok és játékgépek kiállítása.");
                retro.setLocation("Agóra Tudományos Élményközpont");
                retro.setStartDate(LocalDateTime.of(2026, 3, 8, 9, 0));
                retro.setEndDate(LocalDateTime.of(2026, 3, 8, 18, 0));
                retro.setCapacity(200);
                retro.setCreatedAt(LocalDateTime.now());
                eventRepository.save(retro);

                System.out.println("Seeded event: Retro Gamer Kiállítás");
            }

            EventEntity charityRun = eventRepository.findByTitle("Jótékonysági Futás a Gyermekklinikáért");
            if (charityRun == null) {
                charityRun = new EventEntity();
                charityRun.setTitle("Jótékonysági Futás a Gyermekklinikáért");
                charityRun.setDescription("5 km-es futás a Nagyerdőben a beteg gyerekek támogatására.");
                charityRun.setLocation("Nagyerdei Stadion");
                charityRun.setStartDate(LocalDateTime.of(2026, 4, 12, 9, 30));
                charityRun.setEndDate(LocalDateTime.of(2026, 4, 12, 12, 0));
                charityRun.setCapacity(500);
                charityRun.setCreatedAt(LocalDateTime.now());
                eventRepository.save(charityRun);

                System.out.println("Seeded event: Jótékonysági Futás a Gyermekklinikáért");
            }
        };
    }
}
