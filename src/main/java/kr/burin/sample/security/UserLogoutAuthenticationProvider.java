package kr.burin.sample.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import kr.burin.sample.user.service.UserService;

public class UserLogoutAuthenticationProvider implements LogoutSuccessHandler{
	
	@Autowired
	private UserService userService;
	
	public UserLogoutAuthenticationProvider() {
	}
	
	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
		// TODO Auto-generated method stub
		
		if (authentication != null && authentication.getDetails() != null) {
            try {
//            	userManageService.userLogout((String)authentication.getPrincipal());
            	
                request.getSession().invalidate();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } 
		
		response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect("/");  
	}
}
