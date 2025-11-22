package inf.unideb.hu.event_manager.service.mapper;

import inf.unideb.hu.event_manager.data.entity.RegistrationsEntity;
import inf.unideb.hu.event_manager.service.dto.RegistrationsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegistrationsMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "event.id", target = "eventId")
    RegistrationsDto registrationsEntityToDto(RegistrationsEntity entity);

    List<RegistrationsDto> registrationsEntityToDto(List<RegistrationsEntity> entity);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "eventId", target = "event.id")
    RegistrationsEntity registrationsDtoToEntity(RegistrationsDto dto);
}
