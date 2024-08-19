package kr.burin.sample.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.*;
import kr.burin.sample.comm.vo.ResResult;
import kr.burin.sample.user.service.UserService;
import kr.burin.sample.user.vo.UserListVo; 

@RestController
@RequestMapping("/user")
@Api(value = "USER", tags = "USER 관련 API")
public class UserController  {
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private UserService userService;
	
    @RequestMapping(value = "/info", method = RequestMethod.PUT)
    @ApiOperation(value = "유저 정보 수정", notes = "유저정보를 수정한다")	// 메소드에 대한 설명
//	@ApiImplicitParams(value= {
//			@ApiImplicitParam(name="EMAIL", value="이메일", required=true, dataType="string", paramType="json"),
//	})	// parameter 설명
    @ApiResponses({
        @ApiResponse(code = 200, message = "수정 OK!!!"),
        @ApiResponse(code = 404, message = "서버 문제 발생!!!"),
        @ApiResponse(code = 500, message = "페이지를 찾을 수 없어!!!")
    })
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
	public ResResult putUserInfo(@ApiParam(name="UserListVO", value = "UserListVO")@RequestBody UserListVo user_list,HttpServletRequest request,HttpServletResponse response) {
    	return userService.putUserInfo(user_list);
	}

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ApiOperation(value = "유저 정보 리스트 조회", notes = "유저정보 리스트를 조회한다.")	// 메소드에 대한 설명
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
	public ResResult getUserInfo(HttpServletRequest request,
			HttpServletResponse response) {
    	
    	ResResult rr = new ResResult();
    	rr.setCode(200);
    	rr.setValue(userService.getUserInfoList());
    	
    	return rr;
	}
    
    @ApiOperation(value = "유저 정보 삭제", notes = "유저 정보를 삭제한다")	// 메소드에 대한 설명
    @RequestMapping(value = "/info/{deleteId}", method = RequestMethod.DELETE)
    @Consumes(MediaType.APPLICATION_JSON_VALUE)
	public ResResult deleteUserInfo(@ApiParam(name="삭제ID", value = "삭제할 유저 ID")@PathVariable("deleteId") String deleteId, HttpServletRequest request,
			HttpServletResponse response) {
    	
    	return userService.deleteUserInfo(deleteId);
	}
    
    
	/*
	 * @RequestMapping(value = "/sampleinfo／{userId}", method = RequestMethod.GET)
	 * 
	 * @Consumes(MediaType.APPLICATION_JSON_VALUE) public ResResult
	 * getSampleUserInfo(HttpServletRequest request, HttpServletResponse responsef,
	 * 
	 * @PathVariable String userId) {
	 * 
	 * /sampleinfo／admin
	 * 
	 * 
	 * 
	 * ResultUserInfoVo ruiv = new ResultUserInfoVo();
	 * ruiv.setStrList(userService.strList(userId));
	 * ruiv.setStrList2(userService.strList());
	 * 
	 * ResResult rr = new ResResult(); rr.setCode(200);
	 * rr.setValue(userService.getUserInfoList());
	 * 
	 * return rr; }
	 */
}
