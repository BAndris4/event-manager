package inf.unideb.hu.event_manager.data.repository;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
    EventEntity findByTitle(String title);
}
