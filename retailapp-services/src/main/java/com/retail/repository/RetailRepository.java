package com.retail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.retail.entity.StoreEntity;

public interface RetailRepository extends JpaRepository<StoreEntity, Integer> {

		
	@Query("FROM StoreEntity WHERE storeName = :storeName")
	public List<StoreEntity> getStoresByStoreName(@Param("storeName") String storeName);
	
}