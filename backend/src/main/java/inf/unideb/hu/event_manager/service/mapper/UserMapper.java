package inf.unideb.hu.event_manager.service.mapper;

import inf.unideb.hu.event_manager.data.entity.UserEntity;
import inf.unideb.hu.event_manager.service.dto.RegistrationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    RegistrationDto registrationEntityToDto(UserEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    UserEntity registrationDtoToEntity(RegistrationDto dto);

}
