package com.nambi.book.service.serverAPI;

import com.nambi.book.domain.ServerAPI.*;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ServerAPIService {

    private final DictionaryRepository dictionaryRepository;
    private final DropChanceRepository dropChanceRepository;
    private final StageExpRepository stageExpRepository;
    private final ItemRepository itemRepository;
    private final ItemFoodRepository itemFoodRepository;
    private final ItemPotionRepository itemPotionRepository;
    private final InitCharStatRepository initCharStatRepository;
    private final GradeRepository gradeRepository;
    private final ExpRepository expRepository;
    private final EquipRepository equipRepository;

    @Transactional(readOnly = true)
    public List<DictionaryListResponseDto> getDictionary(){
        return dictionaryRepository.findAll().stream()
                .map(DictionaryListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<DropChanceListResponseDto> getDropChance(){
        return dropChanceRepository.findAll().stream()
                .map(DropChanceListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<StageExpListResponseDto> getStageExp(){
        return stageExpRepository.findAll().stream()
                .map(StageExpListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ItemFoodListResponseDto> getItemFood(){
        return itemFoodRepository.findAll().stream()
                .map(ItemFoodListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ItemPotionListResponseDto> getItemPotion(){
        return itemPotionRepository.findAll().stream()
                .map(ItemPotionListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ItemListResponseDto> getItem(){
        return itemRepository.findAll().stream()
                .map(ItemListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<InitCharStatListResponseDto> getInitCharStat(){
        return initCharStatRepository.findAll().stream()
                .map(InitCharStatListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<GradeListResponseDto> getGrade(){
        return gradeRepository.findAll().stream()
                .map(GradeListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ExpListResponseDto> getExp(){
        return expRepository.findAll().stream()
                .map(ExpListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<EquipListResponseDto> getEquip(){
        return equipRepository.findAll().stream()
                .map(EquipListResponseDto::new)
                .collect(Collectors.toList());
    }
}
