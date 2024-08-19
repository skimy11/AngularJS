package kr.burin.sample.manage.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import kr.burin.sample.manage.service.ManageService; 

@RestController
@RequestMapping("/")
@Api(value = "Manage", tags = "MANAGE 관련 API")
public class ManageController  {
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private ManageService manageService;
	
    @RequestMapping(value = "/manage", method = RequestMethod.GET)
	public void main(HttpServletRequest request,
			HttpServletResponse responsef) {
    	
    	System.out.println("controller");
    	Object list = manageService.list();
	}

}
