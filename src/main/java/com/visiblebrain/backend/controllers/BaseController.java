package com.visiblebrain.backend.controllers;

import java.sql.Timestamp;
import java.util.Date;

import com.visiblebrain.backend.exception.WitsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.visiblebrain.backend.model.BaseEntity;

/**
 * Created by bilal on 11/5/15.
 */
public abstract class BaseController<T extends BaseEntity> {
	
	/**
	 * TestSuite hibernate repository to be used to perform CRUD operations
	 * on Test Suites. 
	 */    
    private JpaRepository<T, Long> repository=null;

    public JpaRepository<T, Long> getRepository() {
		return repository;
	}

	public void setRepository(JpaRepository<T, Long> repository) {
		this.repository = repository;
	}

	public Timestamp  getCurrentTime(){
        Date date= new Date();
        long time = date.getTime();
        Timestamp timeStamp = new Timestamp(time);
        return timeStamp;
    }
    
    /**
     * DELETE REST action for Test Suite Rest Controller.
     * @param id of Test Suite to be deleted.
     * @return String message.
     */
    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public void disable(@PathVariable("id") long id) throws WitsException
    {
        try {
        	T obj = null;
            obj = repository.findOne(id);
            obj.setActive(false);            
            repository.save(obj);
        }
        catch (Exception ex){
            throw new WitsException("Error deleting the test suite: ", ex);
        }
    }
}
