package kr.burin.sample.manage.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.burin.sample.manage.service.ManageService;


@Service("manageService")
public class ManageServiceImpl extends EgovAbstractServiceImpl implements ManageService{
	
	private Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private ManageDAO manageDAO;

    public EgovMap select(){
        return manageDAO.selectOne();
    }

    public Object list() {
    	System.out.println("service");
        return manageDAO.list();
    }
    
    public Object insert() {
    	return manageDAO.insert("");
    }

    public int update() {
    	return manageDAO.update("");
    }

    public int delete() {
    	return manageDAO.delete("");
    }


}
