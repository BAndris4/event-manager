package inf.unideb.hu.event_manager.data.repository;

import inf.unideb.hu.event_manager.data.entity.RegistrationsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationsRepository extends JpaRepository<RegistrationsEntity, Long> {

    RegistrationsEntity findByUserIdAndEventId(Long userId, Long eventId);

    List<RegistrationsEntity> findAllByEventId(Long eventId);

    List<RegistrationsEntity> findAllByUserId(Long userId);
}
