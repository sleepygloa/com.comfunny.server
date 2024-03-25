package com.comfunny.server.sys.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class SessionUtil {

    protected static final Logger log = LoggerFactory.getLogger(SessionUtil.class);

    public static void setAttribute(String id, Object object) {
        try {
            log.debug("setAttribute : " + id);
            RequestContextHolder.getRequestAttributes().setAttribute(id, object, RequestAttributes.SCOPE_SESSION);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.debug("setAttribute fail");
        }

    }

    public static Object getAttirbute(String id) {
        Object obj = null;
        try {
            obj = RequestContextHolder.getRequestAttributes().getAttribute(id, RequestAttributes.SCOPE_SESSION);
        } catch (Exception ex) {
            log.debug("getAttribute fail");
        }
        return obj;

    }

    public static void removeAttribute(String name) throws Exception {
        RequestContextHolder.getRequestAttributes().removeAttribute(name, RequestAttributes.SCOPE_SESSION);
    }

    public static String getSessionId() throws Exception {
        return RequestContextHolder.getRequestAttributes().getSessionId();
    }

    @SuppressWarnings("rawtypes")
    public static void setUserInfo(Map<String, Object> userMap) {
        if (null != userMap && userMap.size()>0) {

            Set<String> set = userMap.keySet();
            Iterator it = set.iterator();

            while (it.hasNext()) {
                String id = (String) it.next();
                SessionUtil.setAttribute(id, userMap.get(id));
            }
        }
    }
}