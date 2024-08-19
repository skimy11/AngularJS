package kr.burin.sample;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.trace.LeaveaTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


/**
 * Handles requests for the application home page.
 */
@Controller
@Api(tags = "", hidden=true)
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
    /** TRACE */
    @Resource(name="leaveaTrace")
    LeaveaTrace leaveaTrace;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
    @ApiOperation(value = "홈", hidden=true)
	@RequestMapping(value = "/", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		ModelAndView view = null;
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		if(auth == null || !UsernamePasswordAuthenticationToken.class.isAssignableFrom(auth.getClass())) {
			view = new ModelAndView("login");
			return view;
		}
//		Date date = new Date();
//		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
//		
//		String formattedDate = dateFormat.format(date);
//		
//		model.addAttribute("serverTime", formattedDate );
		view = new ModelAndView("home");
		
		return view;
	}
	
}
