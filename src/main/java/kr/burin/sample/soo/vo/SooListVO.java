package kr.burin.sample.soo.vo;

import java.util.List;

public class SooListVO {
	
	private List<SooVO> soo_list;
	
	public List<SooVO> getSoo_list(){
		return soo_list;
	}
	
	public void setSoo_list(List<SooVO> soo_list) {
		this.soo_list = soo_list;
	}
	
	public void addSoo_list(SooVO soo) {
		this.soo_list.add(soo);
	}

}
