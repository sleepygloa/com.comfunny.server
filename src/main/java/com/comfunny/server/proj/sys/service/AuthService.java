package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.AuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class AuthService {

    @Resource
    AuthRepository authRepository;

//    public Page<AuthResDto> selectAuthList (AuthReqDto authReqDto){
//        Pageable pageable = PageRequest.of(Contraints.PAGE_MIN_VALUE, Contraints.PAGE_MAX_VALUE);
//
//        if(!StringUtils.isEmpty(authReqDto.getAuthNm())){
//            return new AuthResDto().toDtoList(authRepository.findAllByAuthPkBizCdAndAuthPkAuthSeq(authReqDto.getBizCd(), authReqDto.getAuthSeq(), pageable));
//        }
//
//        return new AuthResDto().toDtoList(authRepository.findAllByAuthPkBizCd(authReqDto.getBizCd(), pageable));
//    }

    //코드그룹 저장
//    public void saveAuth(AuthReqDto dto){
//        if(dto.getAuthSeq() < 1){
//            Long maxSeq = authRepository.findMaxByAuthPkBizCd(dto.getBizCd()).get();
//            dto.setAuthSeq(maxSeq+1);
//        }
//        authRepository.save(dto.toEntity());
//    }
//
//    //코드그룹 삭제
//    public void deleteAuth(AuthReqDto dto){
//        AuthMenu selDto = authRepository.findById(new AuthMenuPk(dto.getBizCd(), dto.getAuthSeq())).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. authNm={"+dto.getAuthNm()+"}"));
//        authRepository.delete(selDto);
//    }
}
