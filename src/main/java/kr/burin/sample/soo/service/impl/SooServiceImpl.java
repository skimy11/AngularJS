package kr.burin.sample.soo.service.impl;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.soo.service.SooService;
import kr.burin.sample.soo.vo.ResultSooInfoVo;
import kr.burin.sample.soo.vo.SooListVO;
import kr.burin.sample.soo.vo.SooSearchVO;
import kr.burin.sample.soo.vo.SooVO;


@Service("sooService")
public class SooServiceImpl extends EgovAbstractServiceImpl implements SooService{
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private SooDAO sooDAO;
	
	// 게시판 조회
	public ResResult getSooList(SooSearchVO sooSearchVo) {
		ResResult rr = new ResResult();
		List<SooVO> sooList = sooDAO.getSooList(sooSearchVo);
		int cnt = sooList.size();
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("cnt", cnt);
		resultMap.put("sooList", sooList.subList(sooSearchVo.getStartNum(), sooList.size() < sooSearchVo.getEndNum() ? sooList.size() : sooSearchVo.getEndNum()));
		
		rr.setCode(200);
		rr.setValue(resultMap);
		
		return rr;
	}
	
	// 게시판 삭제
	@Override
    public ResResult deleteList(String id) {
    	ResResult rr = sooDAO.deleteList(id);
    	System.out.println(rr.getValue().toString());
    	return rr;
    }

	// 게시판 추가
	@Override
	public ResResult putSooInfo(SooListVO soo_list) {

	    List<ResultSooInfoVo> ruiv_list = new ArrayList<>();
	    
	    ResResult rr = new ResResult();
	    rr.setCode(200);
	    
	    // 현재 일시를 가져와 포맷팅하는 메서드
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	    String currentDateTime = LocalDateTime.now().format(formatter);
	    
	    
	    
	    for (int i = 0; i < soo_list.getSoo_list().size(); i++) {
	        SooVO currentSooVO = soo_list.getSoo_list().get(i);
	        
	        // writer_name이 null이거나 비어있으면 기본값 설정
	        if (currentSooVO.getWriterName() == null || currentSooVO.getWriterName().isEmpty()) {
	            currentSooVO.setWriterName("USER");
	        }
	        
	        // reg_date가 null이거나 비어있으면 기본값 설정
	        if (currentSooVO.getRegDate() == null || currentSooVO.getRegDate().isEmpty()) {
	            currentSooVO.setRegDate(currentDateTime);
	        }
	        
	        ResResult resultTmp = sooDAO.putSooInfo(currentSooVO);

	        if (resultTmp.getCode() == 200) {
	            System.out.println("Insert Successful for ID: " + currentSooVO.getId());
	        } else {
	            System.err.println("Insert Failed for ID: " + currentSooVO.getId());
	            System.err.println("Error Message: " + resultTmp.getMsg());

	            ResultSooInfoVo ruiv = new ResultSooInfoVo();
	            ruiv.setId(currentSooVO.getId());
	            ruiv.setTitle(currentSooVO.getTitle());
	            ruiv.setContent(currentSooVO.getContent());
	            ruiv.setWriterName(currentSooVO.getWriterName());
	            ruiv.setRegDate(currentSooVO.getRegDate());

	            ruiv_list.add(ruiv);
	        }
	    }
	    
	    rr.setValue(ruiv_list);
	    return rr;
	}

	// 게시판 수정
	@Override
	public ResResult updateSooInfo(SooVO sooVo) {
	    ResResult rr = new ResResult();
	    try {
	        logger.info("Updating SooVO: " + sooVo);
	        int rowsUpdated = sooDAO.updateSooInfo(sooVo);
	        if(rowsUpdated > 0) {
	            rr.setCode(200);
	            rr.setMsg("update success");
	        } else {
	            rr.setCode(400);
	            rr.setMsg("update fail");
	        }
	    } catch (Exception e) {
	        rr.setCode(500);
	        rr.setMsg(e.getMessage());
	        logger.error("Update failed: ", e);
	    }
	    return rr;
	}

	// 최신 ID 조회
	@Override
	public int getLatestId() {
		return sooDAO.selectMaxId();
	}

	// 게시판 상세 조회
	@Override
	public SooVO getSooDetail(String id) {
		SooVO sooDetail = sooDAO.selectSooById(id);
        
        if (sooDetail != null) {
            return sooDetail;
        } else {
            return null;
        }
	}
}
