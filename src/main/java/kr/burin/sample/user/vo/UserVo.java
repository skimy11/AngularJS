package kr.burin.sample.user.vo;

import io.swagger.annotations.*;

@ApiModel(value="유저 VO", description="이메일, 유저 아이디, 유저 비밀번호, 전화번호, 유저 이름, 등록일, 타입")
public class UserVo {
	@ApiModelProperty(value = "이메일")
	private String email;
	@ApiModelProperty(value = "유저 아이디")
	private String user_id;
	@ApiModelProperty(value = "유저 비밀번호")
	private String user_passwd;
	@ApiModelProperty(value = "전화번호")
	private String phone_number;
	@ApiModelProperty(value = "유저 이름")
	private String user_name;
	@ApiModelProperty(value = "등록일")
	private String reg_date;
	@ApiModelProperty(value = "타입")
	private String use_type;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_passwd() {
		return user_passwd;
	}
	public void setUser_passwd(String user_passwd) {
		this.user_passwd = user_passwd;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	public String getUse_type() {
		return use_type;
	}
	public void setUse_type(String use_type) {
		this.use_type = use_type;
	}
	
}
