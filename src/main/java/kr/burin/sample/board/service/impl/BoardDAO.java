package kr.burin.sample.board.service.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import kr.burin.sample.board.vo.BoardListVO;
import kr.burin.sample.board.vo.BoardSearchVO;
import kr.burin.sample.board.vo.BoardVO;
import kr.burin.sample.user.vo.UserVo;

@Repository("boardDAO")
public class BoardDAO extends EgovAbstractMapper {
	
	private Logger logger = LogManager.getLogger(this.getClass());
	
	public List<BoardVO> getBoardList(BoardSearchVO boardSearchVo) {
		List<BoardVO> boardList = selectList("board.BOARD_DAO_GET_BOARD", boardSearchVo);
		
		for(int i = 0; i < 30; i++) {
			BoardVO boardvo = new BoardVO();
			boardvo.setContent(String.valueOf(i) + "번째입니다.");
			boardvo.setId(i+4);
			boardvo.setRegDate("2024-06-26 00:00:00");
			boardvo.setTitle(String.valueOf(i) + "번째 제목");
			boardvo.setWriterName(String.valueOf(i) + "번째 사용자");
			
			boardList.add(boardvo);
		}
		
		return boardList;
	}
	
}
