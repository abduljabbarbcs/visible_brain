package com.visiblebrain.backend.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.visiblebrain.backend.model.BaseEntity;

public interface BaseRepository<T extends BaseEntity, ID extends Serializable> 
extends JpaRepository<T , ID > {
	
}
