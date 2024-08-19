package kr.burin.sample.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.servlet.HandlerInterceptor;

public class SecurityInterceptor implements HandlerInterceptor{
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 1. 사용자 정보 가져오기
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 2. 권한 검증 로직 구현
            if (userDetails.getAuthorities().stream()
                    .anyMatch(auth -> auth.getAuthority().equals("USER"))) {
                return true; // 관리자 권한이 있으면 통과
            } else {
                // 필요한 경우 특정 페이지로 리다이렉트하거나 예외 처리
                response.sendRedirect("/");
                return false;
            }
        }

        // 인증되지 않았거나 권한이 없는 경우
        response.sendRedirect("/");
        return false;
    }
}
