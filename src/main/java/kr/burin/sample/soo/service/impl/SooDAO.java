package kr.burin.sample.soo.service.impl;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;
import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.soo.vo.SooSearchVO;
import kr.burin.sample.soo.vo.SooVO;


@Repository("sooDAO")
public class SooDAO extends EgovAbstractMapper {
	
	private Logger logger = LogManager.getLogger(this.getClass());

	//	게시판 조회
	public List<SooVO> getSooList(SooSearchVO sooSearchVo) {
		List<SooVO> sooList = selectList("soo.SOO_DAO_GET_SOO", sooSearchVo);		
		return sooList;
	}
	
	//	게시판 삭제
	public ResResult deleteList (String id) {
		ResResult rr = new ResResult();
		
		try {
			rr.setCode(200);
			rr.setValue(delete("soo.DELETE_LIST", id));
		} catch (Exception e) {
			// TODO: handle exception
			rr.setCode(500);
			rr.setMsg(e.getMessage());
		}
		
		return rr;
	}
	
	// 게시판 추가
	public ResResult putSooInfo (SooVO sooVo) {		
		ResResult rr = new ResResult();
		
		 try {
		        int rowsInserted = insert("SOO_DAO_PUT_SOO", sooVo);  
		        rr.setCode(200);
		        rr.setValue(rowsInserted);  

		    } catch(Exception e) {
		        rr.setCode(500);
		        rr.setMsg(e.getMessage());
		        e.printStackTrace();  
		    }
		
		return rr;		
	}
	
	// 게시판 수정
	public int updateSooInfo(SooVO sooVo) {
	    return update("SOO_DAO_UPDATE_SOO", sooVo);
	}

	// 최신 ID 조회
	public int selectMaxId() {
		return selectOne("SOO_DAO_SELECT_MAX_ID");
	}

	// 게시판 상세 조회
	public SooVO selectSooById(String id) {
		return selectOne("soo.SOO_DAO_SELECT_SOO_BY_ID", id);
	}
}
