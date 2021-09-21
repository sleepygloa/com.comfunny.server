package com.nambi.book.web;

import com.nambi.book.service.serverAPI.ServerAPIService;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ServerAPIController {

    private final ServerAPIService service;

    @GetMapping("/api/getInitData")
    public JSONObject getInitData(){
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("dictionary", service.getDictionary());
        jsonObject.put("dropChance", service.getDropChance());
//        jsonObject.put("stageExp", service.getStageExp());
        jsonObject.put("item", service.getItem());
        jsonObject.put("initCharStat", service.getInitCharStat());
        jsonObject.put("grade", service.getGrade());
        jsonObject.put("exp", service.getExp());
        jsonObject.put("animal", service.getAnimal());
        jsonObject.put("background", service.getBackground());
        jsonObject.put("job", service.getJob());
        jsonObject.put("skill", service.getSkill());
        jsonObject.put("message", service.getMessage());
        jsonObject.put("stage", service.getStage());
        jsonObject.put("monster", service.getMonster());
        jsonObject.put("itemGrade", service.getItemGrade());
        return jsonObject;
    }

    @PutMapping("/api/saveUser")

    public JSONObject saveUser(@RequestBody Map map){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("user", service.saveUser(map));

        return jsonObject;
    }

    @GetMapping("/api/getDictionary")
    public List<DictionaryListResponseDto> getDictionary(){
        return service.getDictionary();
    }
    @GetMapping("/api/getDropChance")
    public List<DictionaryListResponseDto> getDropChance(){ return service.getDictionary(); }
    @GetMapping("/api/getStageExp")
    public List<StageExpListResponseDto> getStageExp(){
        return service.getStageExp();
    }
    @GetMapping("/api/getItem")
    public List<ItemListResponseDto> getItem(){
        return service.getItem();
    }
    @GetMapping("/api/getInitCharStat")
    public List<InitCharStatListResponseDto> getInitCharStat(){
        return service.getInitCharStat();
    }
    @GetMapping("/api/getGrade")
    public List<GradeListResponseDto> getGrade(){
        return service.getGrade();
    }
    @GetMapping("/api/getExp")
    public List<ExpListResponseDto> getExp(){
        return service.getExp();
    }
    @GetMapping("/api/getAnimal")
    public List<AnimalListResponseDto> getAnimal(){
        return service.getAnimal();
    }
    @GetMapping("/api/getBackground")
    public List<BackgroundListResponseDto> getBackground(){
        return service.getBackground();
    }
    @GetMapping("/api/getJob")
    public List<JobListResponseDto> getJob(){
        return service.getJob();
    }
    @GetMapping("/api/getSkill")
    public List<SkillListResponseDto> getSkill(){
        return service.getSkill();
    }
    @GetMapping("/api/getMessage")
    public List<MessageListResponseDto> getMessage(){
        return service.getMessage();
    }
    @GetMapping("/api/getStage")
    public List<StageListResponseDto> getStage(){
        return service.getStage();
    }
    @GetMapping("/api/getMonster")
    public List<MonsterListResponseDto> getMonster(){
        return service.getMonster();
    }
    @GetMapping("/api/getItemGrade")
    public List<ItemGradeListResponseDto> getItemGrade(){
        return service.getItemGrade();
    }
}
