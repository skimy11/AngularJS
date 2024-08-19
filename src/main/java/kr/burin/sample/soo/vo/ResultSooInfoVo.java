package kr.burin.sample.soo.vo;

import java.util.List;

public class ResultSooInfoVo extends SooVO{
	
	private String fail_msg;

	public String getFail_msg() {
		return fail_msg;
	}

	public void setFail_msg(String fail_msg) {
		this.fail_msg = fail_msg;
	}
	
	private List<String> strList;
	private List<String> strList2;

	public List<String> getStrList() {
		return strList;
	}

	public void setStrList(List<String> strList) {
		this.strList = strList;
	}

	public List<String> getStrList2() {
		return strList2;
	}

	public void setStrList2(List<String> strList2) {
		this.strList2 = strList2;
	}
}
