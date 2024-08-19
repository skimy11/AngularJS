package kr.burin.sample.security;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.FrameworkServlet;

public class SessionMonitoringListener implements HttpSessionListener{

	private final String header = "Login";
	
	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		// TODO Auto-generated method stub
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		//System.out.println("SessionMonitoringListener - sessionDestroyed");
		// session
		HttpSession session = se.getSession();
		// spring web application context
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext(), FrameworkServlet.SERVLET_CONTEXT_PREFIX+"appServlet");
		// security context
		SecurityContext sc = (SecurityContext) session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
		if (sc != null) {
			// authentication
			Authentication auth = sc.getAuthentication();
			String userId = auth.getName();
			
			String footer = "The " + userId + " user is logged out.";
			
			
/*			LogManageService logManageService = context.getBean(LogManageService.class);
			LogMessageService logMessageService = context.getBean(LogMessageService.class);
			
			
			String message = logMessageService.makeMessage(header, 
					new Object(){}.getClass().getEnclosingMethod().getName(), 
					footer);
					
			logManageService.setLogMessage(Config.getSystemCode(), Config.getSystemName(),
				ConfigUtil.LOG_CATEGORY.INFORMATION.getCode(), ConfigUtil.LOG_CATEGORY.INFORMATION.getName(),
				ConfigUtil.LOG_LEVEL.INFORMATION.getCode(), ConfigUtil.LOG_LEVEL.INFORMATION.getName(),
				message);*/
		}
	}
}
