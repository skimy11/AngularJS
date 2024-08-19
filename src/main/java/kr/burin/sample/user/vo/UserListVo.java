package kr.burin.sample.user.vo;

import java.util.List;

public class UserListVo {
	
	private List<UserVo> user_list;

	public List<UserVo> getUser_list() {
		return user_list;
	}

	public void setUser_list(List<UserVo> user_list) {
		this.user_list = user_list;
	}
	
	public void addUser_list(UserVo user) {
		this.user_list.add(user);
	}
}
