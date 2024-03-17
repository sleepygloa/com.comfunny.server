package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.AuthMenuRepository;
import com.comfunny.server.proj.sys.repository.AuthRepository;
import com.comfunny.server.proj.sys.repository.MenuRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class AuthMenuService {

    @Resource
    AuthMenuRepository authMenuRepository;
    @Resource
    AuthRepository authRepository;
    @Resource
    MenuRepository menuRepository;

    //권한메뉴조회
//    public Page<AuthResDto> selectAuthMenuList (AuthReqDto authReqDto){
//        Pageable pageable = PageRequest.of(Contraints.PAGE_MIN_VALUE, Contraints.PAGE_MAX_VALUE);
//        return new AuthResDto().toDtoList(authRepository.findAll(pageable));
//    }
//
//    //권한 미등록메뉴조회
//    public Page<MenuResDto> selectNoRegMenuList (MenuReqDto authReqDto){
//        Pageable pageable = PageRequest.of(Contraints.PAGE_MIN_VALUE, Contraints.PAGE_MAX_VALUE);
//        return new MenuResDto().toDtoList(menuRepository.findNoRegMenuList(authReqDto.getBizCd(), pageable));
//    }
//
//    //권한 등록메뉴조회
//    public Page<MenuResDto> selectRegMenuList (MenuReqDto authReqDto){
//        Pageable pageable = PageRequest.of(Contraints.PAGE_MIN_VALUE, Contraints.PAGE_MAX_VALUE);
//        return new MenuResDto().toDtoList(menuRepository.findRegMenuList(authReqDto.getBizCd(), pageable));
//    }


    //코드그룹 저장
//    public void saveAuthMenu(AuthMenuReqDto dto){
//        authMenuRepository.save(dto.toEntity());
//    }
//
//    //코드그룹 삭제
//    public void deleteAuthMenu(AuthMenuReqDto dto){
//        AuthGrp selDto = authMenuRepository.findById(new AuthGrpPk(dto.getBizCd(), dto.getAuthSeq(), dto.getMenuCd())).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. authSeq={"+dto.getAuthSeq()+"}, menuSeq={"+dto.getMenuCd()+"}"));
//        authMenuRepository.delete(selDto);
//    }
}
