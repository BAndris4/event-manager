package inf.unideb.hu.event_manager.data.repository;

import inf.unideb.hu.event_manager.data.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    RoleEntity findByRoleName(String roleName);
}
