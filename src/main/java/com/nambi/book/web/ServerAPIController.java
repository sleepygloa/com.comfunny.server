package com.nambi.book.web;

import com.nambi.book.service.serverAPI.ServerAPIService;
import com.nambi.book.web.dto.post.PostsResponseDto;
import com.nambi.book.web.dto.post.PostsSaveRequestDto;
import com.nambi.book.web.dto.post.PostsUpdateRequestDto;
import com.nambi.book.web.dto.serverAPI.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ServerAPIController {

    private final ServerAPIService service;

    @GetMapping("/api/getDictionary")
    public List<DictionaryListResponseDto> getDictionary(){
        return service.getDictionary();
    }

    @GetMapping("/api/getDropChance")
    public List<DropChanceListResponseDto> getDropChance(){
        return service.getDropChance();
    }

    @GetMapping("/api/getStageExp")
    public List<StageExpListResponseDto> getStageExp(){
        return service.getStageExp();
    }
    @GetMapping("/api/getItemFood")
    public List<ItemFoodListResponseDto> getItemFood(){
        return service.getItemFood();
    }
    @GetMapping("/api/getItemPotion")
    public List<ItemPotionListResponseDto> getItemPotion(){
        return service.getItemPotion();
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
    @GetMapping("/api/getEquip")
    public List<EquipListResponseDto> getEquip(){
        return service.getEquip();
    }




//    @PostMapping("/api/v1/posts")
//    public Long save(@RequestBody PostsSaveRequestDto requestDto){
//        return service.save(requestDto);
//    }
//
//    @PutMapping("/api/v1/posts/{id}")
//    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto){
//        return service.update(id, requestDto);
//    }
//
//    @DeleteMapping("/api/v1/posts/{id}")
//    public Long delete(@PathVariable Long id){
//        service.delete(id);
//        return id;
//    }
//
//    @GetMapping("/api/v1/posts/{id}")
//    public PostsResponseDto findById(@PathVariable Long id){
//        return service.findById(id);
//    }



}
