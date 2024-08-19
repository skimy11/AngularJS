package kr.burin.sample.board.service;

import java.util.List;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;

import kr.burin.sample.board.vo.BoardSearchVO;
import kr.burin.sample.board.vo.BoardVO;
import kr.burin.sample.comm.vo.ResResult;

public interface BoardService {
	
	public ResResult getBoardList(BoardSearchVO boardSearchVo);
}
