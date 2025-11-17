package inf.unideb.hu.event_manager.service.mapper;

import inf.unideb.hu.event_manager.data.entity.EventEntity;
import inf.unideb.hu.event_manager.service.dto.EventDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {

    EventDto eventEntityToDto(EventEntity entity);
    List<EventDto> eventEntityToDto(List<EventEntity> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    EventEntity eventDtoToEntity(EventDto dto);
    List<EventEntity> eventDtoToEntity(List<EventDto> dtos);
}
