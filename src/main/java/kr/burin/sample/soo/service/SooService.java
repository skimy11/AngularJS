package kr.burin.sample.soo.service;

import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.soo.vo.SooListVO;
import kr.burin.sample.soo.vo.SooSearchVO;
import kr.burin.sample.soo.vo.SooVO;

public interface SooService {
	public ResResult getSooList(SooSearchVO sooSearchVo); // 게시판 조회
	public ResResult deleteList(String id);               // 게시판 삭제
	public ResResult putSooInfo(SooListVO soo_list);      // 게시판 추가
	public ResResult updateSooInfo(SooVO sooVo);         // 게시판 수정
	public int getLatestId(); 							// 최신 ID 조회
	public SooVO getSooDetail(String id);				// 게시판 상세 조회
}
