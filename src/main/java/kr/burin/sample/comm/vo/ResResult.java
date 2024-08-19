package kr.burin.sample.comm.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @작성일 : 2022. 8. 5.
 * @작성자 : Hwang HeeJeong
 * @파일명 : ResResult.java
 * @설명 : HTTP 통신 시 Response 데이터를 받기 위한 모델
 *
 * <PRE>
 * ------------------------
 * 개정이력
 * 2022. 8. 5. Hwang HeeJeong : 최초작성
 * </PRE>
 */

@ApiModel(value="ResResult", description="결과 코드, 결과 메세지, 결과 값")
public class ResResult {

    public static final int SUCCESS_CODE = 0x00;
    public static final int ERROR_CODE = 0x01;

    /** 결과 코드 */ 
    @ApiModelProperty(required=false, value = "결과 코드")
    private int code = SUCCESS_CODE;

    /** 결과 메세지 */
    @ApiModelProperty(name="결과 메세지", value = "결과 메세지")
    private String msg;

    /** 결과 값 */
    @ApiModelProperty(name="결과 값", value = "결과 값")
    private Object value;

    public ResResult() {
        this(true);
    }

    public ResResult(boolean success) {
        this.code = success ? SUCCESS_CODE : ERROR_CODE;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : getCode
     * @Method 설명 : response 코드를 리턴한다.
     * @return code | int | response 코드
     */
    public int getCode() {
        return code;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : getMsg
     * @Method 설명 : response 메시지를 리턴한다. 
     * @return msg | String | response 메시지
     */
    public String getMsg() {
        return msg;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : getValue
     * @Method 설명 : response data를 리턴한다.
     * @return value | Object | response data
     */
    public Object getValue() {
        return value;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : setCode
     * @Method 설명 : response 코드를 저장 한다. 
     * @param resultCode | int | response 코드
     * @return
     */
    public ResResult setCode(int resultCode) {
        this.code = resultCode;
        return this;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : setMsg
     * @Method 설명 : response 메시지를 저장한다. 
     * @param resultMsg | String | response 메시지
     * @return
     */
    public ResResult setMsg(String resultMsg) {
        this.msg = resultMsg;
        return this;
    }

    /**
     * @작성일 : 2022. 8. 5.
     * @작성자 : Hwang HeeJeong
     * @Method Name : setValue
     * @Method 설명 : response data를 저장한다. 
     * @param resultValue | Object | response data
     * @return
     */
    public ResResult setValue(Object resultValue) {
        this.value = resultValue;
        return this;
    }
}
