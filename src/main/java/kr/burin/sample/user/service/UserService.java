package kr.burin.sample.user.service;

import java.util.List;

import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.user.vo.UserListVo;
import kr.burin.sample.user.vo.UserVo;

public interface UserService  {

	public ResResult userLogin(String principal, String password);
	
	public UserVo getMyInfo(String principal);
	
	public ResResult putUserInfo(UserListVo user_list);
	
    public List<UserVo> getUserInfoList();
    
    public ResResult deleteUserInfo(String user_id);
}
