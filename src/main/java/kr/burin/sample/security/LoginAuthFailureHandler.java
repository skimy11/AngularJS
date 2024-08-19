package kr.burin.sample.security;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginAuthFailureHandler implements AuthenticationFailureHandler{


	private String defaultFailureUrl;

    public String getDefaultFailureUrl() {
		return defaultFailureUrl;
	}

    /**
     * @see org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler#onAuthenticationFailure(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.core.AuthenticationException)
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
    	
    	String errMsg = "";
    	
    	if (exception instanceof DisabledException) {
    		errMsg = exception.getMessage();
		} else if(exception instanceof BadCredentialsException) {
    		errMsg = exception.getMessage();
		}
    	
    	System.out.println("errMsg");
    	
    	request.setAttribute("msg", errMsg);
    	request.getRequestDispatcher(this.defaultFailureUrl).forward(request, response);
    }
    
    /**
     * @see org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler#setDefaultFailureUrl(java.lang.String)
     */
    public void setDefaultFailureUrl(String defaultFailureUrl) {
    	this.defaultFailureUrl = defaultFailureUrl;
    }
    
}