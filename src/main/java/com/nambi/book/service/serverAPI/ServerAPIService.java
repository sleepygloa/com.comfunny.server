package com.nambi.book.service.serverAPI;

import com.nambi.book.domain.ServerAPI.*;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ServerAPIService {

    private final UserDataRepository userRepository;
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
    private final AnimalRepository animalRepository;
    private final BackgroundRepository backgroundRepository;
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final MessageRepository messageRepository;
    private final StageRepository stageRepository;
    private final MonsterRepository monsterRepository;

    @Transactional(readOnly = true)
    public void saveUser(JSONObject jsonObject){

        String userType = "0";
        String id = (jsonObject.get("id") != null ? (String)jsonObject.get("id") : null);
        String email = (jsonObject.get("email") != null ? (String)jsonObject.get("email") : null);
        String pw = (jsonObject.get("pw") != null ? (String)jsonObject.get("pw") : null);
        String path = (jsonObject.get("path") != null ? (String)jsonObject.get("path") : null);
        String type = (jsonObject.get("type") != null ? (String)jsonObject.get("type") : null);

        UserData user = userRepository.findByIdOrEmail(id, email);

        //신규
        if(user == null){
            userRepository.save(id,pw,email,path,type);
        }else{
            userType = "1";
        }



//        System.out.println(user.toString());


//        return monsterRepository.findAll().stream()
//                .map(MonsterListResponseDto::new)
//                .collect(Collectors.toList());
    }

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
    @Transactional(readOnly = true)
    public List<AnimalListResponseDto> getAnimal(){
        return animalRepository.findAll().stream()
                .map(AnimalListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<BackgroundListResponseDto> getBackground(){
        return backgroundRepository.findAll().stream()
                .map(BackgroundListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<JobListResponseDto> getJob(){
        return jobRepository.findAll().stream()
                .map(JobListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<SkillListResponseDto> getSkill(){
        return skillRepository.findAll().stream()
                .map(SkillListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<MessageListResponseDto> getMessage(){
        return messageRepository.findAll().stream()
                .map(MessageListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<StageListResponseDto> getStage(){
        return stageRepository.findAll().stream()
                .map(StageListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<MonsterListResponseDto> getMonster(){
        return monsterRepository.findAll().stream()
                .map(MonsterListResponseDto::new)
                .collect(Collectors.toList());
    }
}
