package kr.burin.sample.board.service.impl;

import java.text.SimpleDateFormat;
import java.util.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.burin.sample.board.service.BoardService;
import kr.burin.sample.board.vo.BoardListVO;
import kr.burin.sample.board.vo.BoardSearchVO;
import kr.burin.sample.board.vo.BoardVO;
import kr.burin.sample.comm.vo.ResResult;


@Service("boardService")
public class BoardServiceImpl extends EgovAbstractServiceImpl implements BoardService{
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private BoardDAO boardDAO;
	
	public ResResult getBoardList(BoardSearchVO boardSearchVo) {
		ResResult rr = new ResResult();
		List<BoardVO> boardList = boardDAO.getBoardList(boardSearchVo);
		int cnt = boardList.size();
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("cnt", cnt);
		resultMap.put("boardList", boardList.subList(boardSearchVo.getStartNum(), boardList.size() < boardSearchVo.getEndNum() ? boardList.size() : boardSearchVo.getEndNum()));
		
		rr.setCode(200);
		rr.setValue(resultMap);
		
		return rr;
	}


}
