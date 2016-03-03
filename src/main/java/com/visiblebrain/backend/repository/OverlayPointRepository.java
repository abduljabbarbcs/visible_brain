package com.visiblebrain.backend.repository;

import com.visiblebrain.backend.model.OverlayPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Transactional
public interface OverlayPointRepository extends JpaRepository<OverlayPoint, Long> {
}
