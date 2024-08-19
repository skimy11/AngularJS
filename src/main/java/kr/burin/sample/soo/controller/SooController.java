package kr.burin.sample.soo.controller;



import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.soo.service.SooService;
import kr.burin.sample.soo.vo.SooListVO;
import kr.burin.sample.soo.vo.SooSearchVO;
import kr.burin.sample.soo.vo.SooVO;
import kr.burin.sample.user.vo.UserListVo;

@RestController
@RequestMapping("/soo")
public class SooController  {
	
	private Logger logger = LogManager.getLogger(this.getClass());
	
	@Autowired
	private SooService sooService;
	
	
	// 게시판 조회
    @RequestMapping(value = "/sooList", method = RequestMethod.GET)
    @ResponseBody
	public ResResult getSooList(HttpServletRequest request) {
    	ObjectMapper om = new ObjectMapper();
        SooSearchVO sooSearchVO = new SooSearchVO();
        Map<String, String[]> parameterMap = request.getParameterMap();
        
        try {
            BeanUtils.populate(sooSearchVO, parameterMap);
            System.out.println("sooSearchVO:" + sooSearchVO);
        } catch (Exception e) {
        	System.out.println("error");
        }
        
    	return sooService.getSooList(sooSearchVO);
	}
    
    
    // 게시판 삭제
    @ApiOperation(value = "게시판 정보 삭제", notes = "게시판 정보를 삭제한다")
    @RequestMapping(value = "/sooList/{deleteId}", method = RequestMethod.DELETE)
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
	public ResResult deleteUserInfo(@ApiParam(name="삭제ID", value = "삭제할 게시판 ID")@PathVariable("deleteId") String deleteId, HttpServletRequest request,
			HttpServletResponse response) {
    	
    	return sooService.deleteList(deleteId);
	}
    
    
    // 게시판 추가
    @ApiOperation(value = "게시판 정보 추가", notes = "게시판 정보를 추가한다")    
    @RequestMapping(value = "/sooBoard", method = RequestMethod.PUT)
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
   	public ResResult putSooInfo(@ApiParam(name="SooListVO", value = "SooListVO")@RequestBody SooListVO soo_list,HttpServletRequest request,HttpServletResponse response) {
    	System.out.println("Received SooListVO: " + soo_list);
    	return sooService.putSooInfo(soo_list);   	
   	}
    
    
    // 게시판 수정
    @ApiOperation(value = "게시판 정보 수정", notes = "게시판 정보를 수정한다")  
    @RequestMapping(value = "/sooBoard", method = RequestMethod.POST)
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
    public ResResult updateSooInfo(@ApiParam(name="SooVO", value = "SooVO") @RequestBody SooVO sooVo,HttpServletRequest request,HttpServletResponse response) {
    	return sooService.updateSooInfo(sooVo);
    }
    
    
    // 최신 ID 조회
    @ApiOperation(value = "최신 ID 조회", notes = "게시판에서 가장 큰 ID 값을 반환한다.")
    @RequestMapping(value = "/getLatestId", method = RequestMethod.GET)
    @ResponseBody
    public ResResult getLatestId() {
        // 가장 큰 ID 값을 조회하는 서비스 메서드를 호출
        int latestId = sooService.getLatestId();
        
        // ResResult는 성공 여부와 데이터를 담을 수 있는 객체로 가정
        ResResult result = new ResResult();
        result.setCode(200); 
        result.setValue(latestId);
        
        return result;
    }
    
    
    // 게시판 상세 조회
    @ApiOperation(value = "게시판 상세 조회", notes = "특정 ID에 대한 게시판 정보를 조회한다")
    @RequestMapping(value = "/sooList/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResResult getSooDetail(@ApiParam(name="ID", value = "조회할 게시판 ID") @PathVariable("id") String id) {
        SooVO sooVo = sooService.getSooDetail(id);  

        ResResult result = new ResResult();
        if (sooVo != null) {
            result.setCode(200); 
            result.setValue(sooVo);
        } else {
            result.setCode(404);  
            result.setMsg("해당 ID의 데이터를 찾을 수 없습니다.");
        }

        return result;
    }
}
