package com.nambi.book.web;

import com.nambi.book.service.serverAPI.ServerAPIService;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ServerAPIController {

    private final ServerAPIService service;

    @GetMapping("/api/getInitData")
    public JSONObject getInitData(){
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("dictionary", service.getDictionary());
        jsonObject.put("dropChance", service.getDropChance());
        jsonObject.put("stageExp", service.getStageExp());
        jsonObject.put("itemFood", service.getItemFood());
        jsonObject.put("itemPotion", service.getItemPotion());
        jsonObject.put("item", service.getItem());
        jsonObject.put("initCharStat", service.getInitCharStat());
        jsonObject.put("grade", service.getGrade());
        jsonObject.put("exp", service.getExp());
        jsonObject.put("equip", service.getEquip());
        jsonObject.put("animal", service.getAnimal());
        jsonObject.put("background", service.getBackground());
        jsonObject.put("job", service.getJob());
        jsonObject.put("skill", service.getSkill());
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
    @GetMapping("/api/getItemFood")
    public List<ItemFoodListResponseDto> getItemFood(){
        return service.getItemFood();
    }
    @GetMapping("/api/getItemPotion")
    public List<ItemPotionListResponseDto> getItemPotion(){ return service.getItemPotion();}
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
    @GetMapping("/api/getEquip")
    public List<EquipListResponseDto> getEquip(){
        return service.getEquip();
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

}
