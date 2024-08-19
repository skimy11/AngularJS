package kr.burin.sample.board.vo;

import java.util.List;

public class BoardListVO {
	
	private List<BoardVO> board_list;
	
	public List<BoardVO> getBoard_list(){
		return board_list;
	}
	
	public void setBoard_list(List<BoardVO> board_list) {
		this.board_list = board_list;
	}
	
	public void addBoard_list(BoardVO board) {
		this.board_list.add(board);
	}

}
