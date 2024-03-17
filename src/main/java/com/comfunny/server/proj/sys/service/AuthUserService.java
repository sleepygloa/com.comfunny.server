package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.repository.AuthUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class AuthUserService {

    @Resource
    AuthUserRepository authUserRepository;

//    public Page<AuthUserResDto> selectAuthUserList (AuthUserReqDto authReqDto){
//        Pageable pageable = PageRequest.of(Contraints.PAGE_MIN_VALUE, Contraints.PAGE_MAX_VALUE);
//        return new AuthUserResDto().toDtoList(authUserRepository.findAll(pageable));
//    }
//
//
//    //코드그룹 저장
//    public void saveAuthUser(AuthUserReqDto dto){
//        authUserRepository.save(dto.toEntity());
//    }

    //코드그룹 삭제
//    public void deleteAuthUser(AuthUserReqDto dto){
//        AuthUser selDto = authUserRepository.findById(new AuthUserPk(dto.getBizCd(), dto.getAuthSeq(), dto.getUserId())).orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. authSeq={"+dto.getAuthSeq()+"}, userId={"+dto.getUserId()+"}"));
//        authUserRepository.delete(selDto);
//    }
}
