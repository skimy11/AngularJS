package kr.burin.sample.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

//import org.codehaus.jackson.map.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.user.service.UserService;
import kr.burin.sample.user.vo.UserVo; 

public class UserLoginAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	private UserService userService;
	
	public UserLoginAuthenticationProvider() {
	}
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		
        Object principal = authentication.getPrincipal();
        Object password = authentication.getCredentials();
        
        ResResult resResult = userService.userLogin((String)principal, (String)password);			// API 서버에 로그인 요청
        if(resResult.getCode() == 453 || resResult.getCode() == 454 || resResult.getCode() == 455 || resResult.getCode() == 400) {	// 사용자 ID 또는 Password가 일치 하지 않는 경우 / 사용자가 없는 경우  / 삭제된 사용자인 경우
        	throw new BadCredentialsException(resResult.getMsg());
        }
        
        // 사용자가 승인 대기 상태인지 승인인지 체크 함.
//        Map<String, Object> map = new HashMap<String, Object>();
//        ObjectMapper om = new ObjectMapper();
//        map = om.convertValue(resResult.getValue(), map.getClass());

//        System.out.println("token : " + map.get("token") + ", state : " + map.get("state"));
        
//        if(map.get("state").equals(Constants.USER_STATE_WAIT)) {
//        	throw new DisabledException("해당 ID는 승인 대기 중입니다. 시스템 관리자에게 문의 하시기 바랍니다.");
//        }
        
        // 사용자 정보를 가져 온다.
        UserVo userVo = userService.getMyInfo((String)principal);
        
        Collection<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
		roles.add(new SimpleGrantedAuthority("USER"));
        
		return new UsernamePasswordAuthenticationToken(userVo.getUser_id(), userVo.getUser_passwd(), roles);
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return Authentication.class.isAssignableFrom(authentication);
	}
}
