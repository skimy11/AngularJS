package kr.burin.sample.board.controller;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.burin.sample.board.service.BoardService;
import kr.burin.sample.board.vo.BoardSearchVO;
import kr.burin.sample.comm.vo.ResResult;

@RestController
@RequestMapping("/board")
@Api(value = "Board", tags = "BOARD 관련 API")
public class BoardController  {
	
	private Logger logger = LogManager.getLogger(this.getClass());
	
	@Autowired
	private BoardService boardService;
	
    @RequestMapping(value = "/boardList", method = RequestMethod.GET)
    @ApiOperation(value = "게시판 리스트 조회", notes = "게시판 리스트를 조회한다.")	// 메소드에 대한 설명
    @ResponseBody
	public ResResult getBoardList(HttpServletRequest request) {
    	ObjectMapper om = new ObjectMapper();
        BoardSearchVO boardSearchVO = new BoardSearchVO();
        Map<String, String[]> parameterMap = request.getParameterMap();
        
        try {
            BeanUtils.populate(boardSearchVO, parameterMap);
        } catch (Exception e) {
            // 예외 처리
        }
        
    	return boardService.getBoardList(boardSearchVO);
	}
}
