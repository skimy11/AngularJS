package kr.burin.sample.user.service.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.user.vo.UserVo;

@Repository("userDAO")
public class UserDAO extends EgovAbstractMapper {
	
	private Logger logger = LogManager.getLogger(this.getClass());
    
	public UserVo getUserInfo(String userId) {

		UserVo user = selectOne("user.USER_LOGIN", userId);
		
		return user;
	}
    
    public ResResult putUserInfo(UserVo user) {
    	
    	ResResult rr = new ResResult();
    	
    	try {
    		rr.setCode(200);
    		rr.setValue(insert("user.USER_DAO_PUT_USER_INFO", user));
    	}catch (Exception e) {
			// TODO: handle exception
    		rr.setCode(500);
    		rr.setMsg(e.getMessage());
		}
    	
    	return rr;
    }
    
    public List<UserVo> getUserInfoList() {
    	List<UserVo> user_info_list = selectList("user.USER_DAO_GET_USER_INFO");
    	
    	return user_info_list;
    }
    
    public ResResult deleteUserInfo(String user_id) {
    	ResResult rr = new ResResult();
    	
    	try {
    		rr.setCode(200);
    		rr.setValue(delete("user.USER_DAO_DELETE_USER_INFO", user_id));
    	}catch (Exception e) {
			// TODO: handle exception
    		rr.setCode(500);
    		rr.setMsg(e.getMessage());
		}
    	
    	return rr;
    }
}
