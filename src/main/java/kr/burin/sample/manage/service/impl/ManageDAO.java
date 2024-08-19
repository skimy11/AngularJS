package kr.burin.sample.manage.service.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

@Repository("manageDAO")
public class ManageDAO extends EgovAbstractMapper {
	
	private Logger logger = LogManager.getLogger(this.getClass());
    
    public EgovMap selectOne() {
        return (EgovMap)selectOne("LINK_NODE_SEARCH_Dao_siteInfoList");
    }
    
    public Object list() {
    	System.out.println("dao");
    	
    	List<Object> map = selectList("sample.LINK_NODE_SEARCH_Dao_siteInfoList");
    	                               
    	
        return map;
    }

    public Object insert() {
    	return insert("");
    }

    public int update() {
    	return update("");
    }

    public int delete() {
    	return delete("");
    }
}
