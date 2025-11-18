package inf.unideb.hu.event_manager.data.repository;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByEmail(String email);
}
