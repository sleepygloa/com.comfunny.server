package com.comfunny.server.sys.security;


import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.repository.UserRepository;
import com.comfunny.server.sys.security.controller.dto.Role;
import com.comfunny.server.sys.security.controller.dto.SessionUser;
import com.comfunny.server.sys.security.controller.dto.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // OAuth 서비스 이름(ex. kakao, naver, google)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth 로그인 시 키(pk)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들
        UserProfile userProfile = OAuthAttributes.extract(registrationId, attributes); // registrationId에 따라 유저 정보를 통해 공통된 UserProfile 객체로 만들어 줌
        userProfile.setProvider(registrationId);
        User user = saveOrUpdate(userProfile);

        Map<String, Object> customAttributes = customAttribute(attributes, userNameAttributeName, userProfile, registrationId);

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttributes,
                userNameAttributeName);
    }

    private Map customAttribute(Map attributes, String userNameAttributeName, UserProfile userProfile, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", registrationId);
        customAttribute.put("name", userProfile.getName());
        customAttribute.put("email", userProfile.getEmail());
        return customAttribute;

    }

    private User saveOrUpdate(UserProfile userProfile) {
        User user = userRepository.findByEmailAndProvider(userProfile.getEmail(), userProfile.getProvider())
                .map(m -> m.update(userProfile.getName(), userProfile.getEmail()))
                .orElse(userProfile.toUser());
        user.setUserId(userProfile.getEmail());
        user.setNickname(userProfile.getName());
        return userRepository.save(user);
    }
}
