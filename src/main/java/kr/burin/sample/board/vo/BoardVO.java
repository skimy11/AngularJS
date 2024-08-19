package kr.burin.sample.board.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="게시판 VO", description="")
public class BoardVO {
	@ApiModelProperty(value = "번호")
	private int id;
	@ApiModelProperty(value = "제목")
	private String title;
	@ApiModelProperty(value = "내용")
	private String content;
	@ApiModelProperty(value = "작성자")
	private String writer_name;
	@ApiModelProperty(value = "작성일")
	private String reg_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getWriterName() {
		return writer_name;
	}
	
	public void setWriterName(String writer_name) {
		this.writer_name = writer_name;
	}
	
	public String getRegDate() {
		return reg_date;
	}
	
	public void setRegDate(String reg_date) {
		this.reg_date = reg_date;
	}
	
}
