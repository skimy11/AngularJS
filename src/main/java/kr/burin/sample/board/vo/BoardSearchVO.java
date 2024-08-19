package kr.burin.sample.board.vo;

public class BoardSearchVO {
    private String regDateStart;
    private String regDateEnd;
    private String titleKeyword;
    private String contentKeyword;
    private String writerName;
    private int startNum;
    private int endNum;
    
    // Getter 메서드
    public String getRegDateStart() {
        return regDateStart;
    }

    public String getRegDateEnd() {
        return regDateEnd;
    }

    public String getTitleKeyword() {
        return titleKeyword;
    }

    public String getContentKeyword() {
        return contentKeyword;
    }

    public String getWriterName() {
        return writerName;
    }
    
    public int getStartNum() {
    	return startNum;
    }
    
    public int getEndNum() {
    	return endNum;
    }

    // Setter 메서드
    public void setRegDateStart(String regDateStart) {
        this.regDateStart = regDateStart;
    }

    public void setRegDateEnd(String regDateEnd) {
        this.regDateEnd = regDateEnd;
    }

    public void setTitleKeyword(String titleKeyword) {
        this.titleKeyword = titleKeyword;
    }

    public void setContentKeyword(String contentKeyword) {
        this.contentKeyword = contentKeyword;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }
    
    public void setStartNum(int startNum) {
    	this.startNum = startNum;
    }
    
    public void setEndNum(int endNum) {
    	this.endNum = endNum;
    }
}
