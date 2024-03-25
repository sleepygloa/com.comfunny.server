package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.Message;
import com.comfunny.server.proj.sys.repository.MessageDao;
import com.comfunny.server.proj.sys.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/api/sys/message")
public class MessageController {

    @Resource
    private MessageRepository messageRepository;
    @Resource
    private MessageDao messageDao;
//
//    /**
//     * @Program : 메시지 화면이동
//     * @Desc :
//     * */
//    @RequestMapping
//    public String selectLeftMenu(){
//        return "/sys/sysMessage";
//    }
//
//    /**
//     * @Program : 메시지 코어 데이터 조회
//     * @Desc :
//     * */
//    @GetMapping("/getCoreMessage")
//    public Params getDomain(Params params){
//        List<Message> list = messageRepository.findAllByMessagePkBizCdAndMessagePkLangCd(params.getString("s_bizCd"), params.getString("s_language"));
//        Map map = new HashMap();
//        for(Message message : list){
//            map.put(message.getMessagePk().getMsgCd(), message.getMsgTxt());
//        }
//        params.put("dt_message", map);
//        return params;
//    }
//
//
//    /**
//     * @Program : 메시지 데이터 조회
//     * @Desc :
//     * */
//    @RequestMapping("/selectMessageList")
//    public Params selectMessageList(Params params){
//        List<Params> list = messageDao.selectMessageList(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        params.put("dt_grid", list);
//        return params;
//    }
}
