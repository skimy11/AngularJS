package kr.burin.sample.util;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @작성일 : 2022. 8. 5.
 * @작성자 : Hwang HeeJeong
 * @파일명 : JsonService.java
 * @설명 : data를 JSON 또는 JSON을 data 형태로 변경해주는 Util
 *
 * <PRE>
 * ------------------------
 * 개정이력
 * 2022. 8. 5. Hwang HeeJeong : 최초작성
 * </PRE>
 */
public class JsonService{

	/**
	 * @작성일 : 2022. 8. 5.
	 * @작성자 : Hwang HeeJeong
	 * @Method Name : objectToClass
	 * @Method 설명 : Object 데이터를 Class(데이터 모델) 형태로 변경 한다. 
	 * @param resResult | Object | Object 형테의 데이터
	 * @param toValueType | Class<T> | 변환 하고자 하는 데이터 모델
	 * @return <T> T | Class<T> | 변환 데이터 모델
	 */
	public <T> T objectToClass(Object resResult, Class<T> toValueType){
		ObjectMapper rOm = new ObjectMapper();
		rOm.setSerializationInclusion(Include.NON_NULL);
        return rOm.convertValue(resResult, toValueType);
	}
	
	/**
	 * @작성일 : 2022. 8. 5.
	 * @작성자 : Hwang HeeJeong
	 * @Method Name : stringToClass
	 * @Method 설명 :	JSON 문자열을 Class(데이터 모델) 형태로 변경 
	 * @param resResult | Object | Object 형테의 데이터
	 * @param toValueType | Class<T> | 변환 하고자 하는 데이터 모델
	 * @return <T> T | Class<T> | 변환 데이터 모델
	 * @throws JsonMappingException
	 * @throws JsonProcessingException
	 */
	public <T> T stringToClass(String resResult, Class<T> toValueType) throws JsonMappingException, JsonProcessingException{
		ObjectMapper rOm = new ObjectMapper();
		rOm.setSerializationInclusion(Include.NON_NULL);
       	return rOm.readValue(resResult, toValueType);
	}
}
