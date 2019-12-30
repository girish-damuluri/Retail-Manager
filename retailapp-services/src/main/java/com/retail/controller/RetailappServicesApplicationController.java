package com.retail.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.retail.entity.StoreEntity;
import com.retail.repository.RetailRepository;



@RestController
@RequestMapping("/api/retail")
public class RetailappServicesApplicationController {
private static final Logger logger = LoggerFactory.getLogger(RetailappServicesApplicationController.class);
	
	@Autowired
	private RetailRepository retailRepository;
	
	@PostMapping("/create")
	public List<StoreEntity> addStore(@RequestBody StoreEntity store) {
		logger.debug("RetailappServicesApplicationController :: addStore");
		retailRepository.save(store);
		return retailRepository.findAll();
	}
	
	@GetMapping("/getStoresByStoreName")
	public List<StoreEntity> getStoresByStoreName(@RequestParam("storeName") String storeName) {
		logger.debug("RetailappServicesApplicationController :: getStoresByStoreName");
		return retailRepository.getStoresByStoreName(storeName);
	}
	
	
}
