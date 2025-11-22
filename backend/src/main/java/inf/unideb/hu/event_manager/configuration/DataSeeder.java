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
            }

            RoleEntity adminRole = roleRepository.findByRoleName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = new RoleEntity();
                adminRole.setRoleName("ROLE_ADMIN");
                roleRepository.save(adminRole);
            }

            UserEntity existingUser = userRepository.findByEmail("user@user.com");
            if (existingUser == null) {
                UserEntity user = new UserEntity();
                user.setFirstName("John");
                user.setLastName("Doe");
                user.setEmail("user@user.com");
                user.setPassword(passwordEncoder.encode("user"));
                user.setRole(userRole);
                userRepository.save(user);
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
            }

            EventEntity pastEvent = eventRepository.findByTitle("Télbúcsúztató Fesztivál");
            if (pastEvent == null) {
                pastEvent = new EventEntity();
                pastEvent.setTitle("Télbúcsúztató Fesztivál");
                pastEvent.setDescription("Zenés-ünnepi programok a főtéren.");
                pastEvent.setLocation("Debrecen, Kossuth tér");
                pastEvent.setStartDate(LocalDateTime.now().minusDays(10));
                pastEvent.setCapacity(100);
                pastEvent.setCreatedAt(LocalDateTime.now());
                pastEvent.setUpdatedAt(LocalDateTime.now());
                eventRepository.save(pastEvent);
            }

            EventEntity futureEvent1 = eventRepository.findByTitle("Kódolás Éjszakája");
            if (futureEvent1 == null) {
                futureEvent1 = new EventEntity();
                futureEvent1.setTitle("Kódolás Éjszakája");
                futureEvent1.setDescription("Egész éjszakás programozó-maraton kezdőknek és haladóknak.");
                futureEvent1.setLocation("Debreceni Egyetem Informatikai Kar");
                futureEvent1.setStartDate(LocalDateTime.now().plusDays(14));
                futureEvent1.setCapacity(80);
                futureEvent1.setCreatedAt(LocalDateTime.now());
                futureEvent1.setUpdatedAt(LocalDateTime.now());
                eventRepository.save(futureEvent1);
            }

            EventEntity futureEvent2 = eventRepository.findByTitle("Tavaszi Egyetemi Sportnap");
            if (futureEvent2 == null) {
                futureEvent2 = new EventEntity();
                futureEvent2.setTitle("Tavaszi Egyetemi Sportnap");
                futureEvent2.setDescription("Foci, röplabda, futás és még sok sportos kihívás.");
                futureEvent2.setLocation("Nagyerdei Stadion");
                futureEvent2.setStartDate(LocalDateTime.now().plusDays(30));
                futureEvent2.setCapacity(300);
                futureEvent2.setCreatedAt(LocalDateTime.now());
                futureEvent2.setUpdatedAt(LocalDateTime.now());
                eventRepository.save(futureEvent2);
            }

            EventEntity singleSlot = eventRepository.findByTitle("VIP Bor Kóstoló – Limitált");
            if (singleSlot == null) {
                singleSlot = new EventEntity();
                singleSlot.setTitle("VIP Bor Kóstoló – Limitált");
                singleSlot.setDescription("Exkluzív borok 1 résztvevőnek.");
                singleSlot.setLocation("Tokaj – Borvidék");
                singleSlot.setStartDate(LocalDateTime.now().plusDays(7));
                singleSlot.setCapacity(1);
                singleSlot.setCreatedAt(LocalDateTime.now());
                singleSlot.setUpdatedAt(LocalDateTime.now());
                eventRepository.save(singleSlot);
            }
        };
    }
}