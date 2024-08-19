package kr.burin.sample.user.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.user.service.UserService;
import kr.burin.sample.user.vo.ResultUserInfoVo;
import kr.burin.sample.user.vo.UserListVo;
import kr.burin.sample.user.vo.UserVo;


@Service("userService")
public class UserServiceImpl extends EgovAbstractServiceImpl implements UserService{
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	public ResResult userLogin(String principal, String password) {
		ResResult rr = new ResResult();
		UserVo user = userDAO.getUserInfo(principal);
		
		rr.setCode(200);
		
		if(user != null) {
			
			String encodePassword = passwordEncoder.encode(password); 
			
			if(!passwordEncoder.matches(password, user.getUser_passwd())) {
				rr.setCode(454);
				rr.setMsg("사용자 ID 또는 Password가 일치 하지 않습니다.");
			}
			
			if(user.getUse_type().contains("N")) {
				rr.setCode(400);
				rr.setMsg("삭제된 사용자입니다.");
			}
		}else {
			rr.setCode(454);
			rr.setMsg("사용자 정보를 찾을 수 없습니다.");
		}
		
		return rr;
	}
	
	public UserVo getMyInfo(String user_id) {
		
		UserVo user = userDAO.getUserInfo(user_id);
		
		return user;
	}
	
	public ResResult putUserInfo(UserListVo user_list) {
		
		List<ResultUserInfoVo> ruiv_list = new ArrayList();
		
		ResResult rr = new ResResult();
		rr.setCode(200);
		for(int i = 0; i < user_list.getUser_list().size(); i++) {
			ResResult resultTmp = userDAO.putUserInfo(user_list.getUser_list().get(i));
			
			if(resultTmp.getCode() != 200) {
				ResultUserInfoVo ruiv = new ResultUserInfoVo();
			
				ruiv.setEmail(user_list.getUser_list().get(i).getEmail());
				ruiv.setPhone_number(user_list.getUser_list().get(i).getPhone_number());
				ruiv.setUser_id(user_list.getUser_list().get(i).getUser_id());
				ruiv.setUser_name(user_list.getUser_list().get(i).getUser_name());
				ruiv.setUser_passwd(user_list.getUser_list().get(i).getUser_passwd());
				ruiv.setFail_msg(resultTmp.getMsg());
				
				ruiv_list.add(ruiv);
			}
		}
		
		rr.setValue(ruiv_list);
		return rr;
	}
	
    public List<UserVo> getUserInfoList() {
    	return userDAO.getUserInfoList();
    }
    
    public ResResult deleteUserInfo(String user_id) {
    	ResResult rr = userDAO.deleteUserInfo(user_id);
    	System.out.println(rr.getValue().toString());
    	return rr;
    }
}
