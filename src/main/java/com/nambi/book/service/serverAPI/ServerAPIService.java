package com.nambi.book.service.serverAPI;

import com.nambi.book.domain.ServerAPI.*;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ServerAPIService {

    private final UserDataRepository userDataRepository;
    private final DictionaryRepository dictionaryRepository;
    private final DropChanceRepository dropChanceRepository;
    private final StageExpRepository stageExpRepository;
    private final ItemRepository itemRepository;
    private final InitCharStatRepository initCharStatRepository;
    private final GradeRepository gradeRepository;
    private final ExpRepository expRepository;
    private final AnimalRepository animalRepository;
    private final BackgroundRepository backgroundRepository;
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final MessageRepository messageRepository;
    private final StageRepository stageRepository;
    private final MonsterRepository monsterRepository;
    private final ItemGradeRepository itemGradeRepository;
    private final SeqRepository seqRepository;
    private final ConnectLogRepository connectLogRepository;
    private final ItemReinforceRepository itemReinforceRepository;

    @Transactional(readOnly = true)
    public List<UserDataDto> saveUser(Map map){

        String userType = "0";
        String id = (map.get("id") != null ? (String)map.get("id") : null);
        String email = (map.get("email") != null ? (String)map.get("email") : "");
        String name = (map.get("name") != null ? (String)map.get("name") : "무명 용병단장");
        String pw = (map.get("pw") != null ? (String)map.get("pw") : "1234");
        String path = (map.get("path") != null ? (String)map.get("path") : "");
        String type = (map.get("type") != null ? (String)map.get("type") : "email");

        UserData user = userDataRepository.findByIdOrEmail(id, email);
        UserDataDto dto = new UserDataDto();

        //이메일 가입 id : X, email : O
        //카카오톡 가입  id : O, email : X/O
        //구글 가입 id : O, email : X/O

        //소셜 구분 id, 소셜내 구분 type

        //신규
        if(user == null){

            //아이디 채번 12자리//날짜+202101010001
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Date date = new Date();
            String strDate = sdf.format(date);

            String yyyymmdd = strDate;
            String code = "USER";

            Seq getSysSeq = seqRepository.findByCodeAndYyyymmdd(code, yyyymmdd);
            Long count = 1l;
            Long newCount = count+1;

            if(getSysSeq == null){
                System.out.println("null");
                int cnt = seqRepository.insertCount(code, yyyymmdd, newCount);

            }else{
                System.out.println("not null");

                count = getSysSeq.getCount();
                newCount = count+1;
                int cnt = seqRepository.updateCount(code, yyyymmdd, newCount);
            }

            id = yyyymmdd+String.format("%04d", count);

            //아이디 생성
            userDataRepository.insert(id, pw, email, name, path, type);

            dto.setReturnType(0);
            dto.setId(id);
            dto.setEmail(email);
            dto.setName(name);
            dto.setPw(pw);
            dto.setPath(path);
            dto.setType(type);
        }else{
            dto.setReturnType(1);
            dto.setId(user.getId());
            dto.setEmail(user.getEmail());
            dto.setName(user.getName());
            dto.setPw(user.getPw());
            dto.setPath(user.getPath());
            dto.setType(user.getType());
        }



        //접속로그
        connectLogRepository.insert(id);

        List<UserDataDto> list = new ArrayList<UserDataDto>();
        list.add(dto);
        return list;
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
    @Transactional(readOnly = true)
    public List<ItemGradeListResponseDto> getItemGrade(){
        return itemGradeRepository.findAll().stream()
                .map(ItemGradeListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ItemReinforceListResponseDto> getItemReinforce(){
        return itemReinforceRepository.findAll().stream()
                .map(ItemReinforceListResponseDto::new)
                .collect(Collectors.toList());
    }
}
