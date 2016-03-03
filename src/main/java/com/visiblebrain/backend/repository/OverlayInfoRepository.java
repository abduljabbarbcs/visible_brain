package com.visiblebrain.backend.repository;

import com.visiblebrain.backend.model.OverlayInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Transactional
public interface OverlayInfoRepository extends JpaRepository<OverlayInfo, Long> {
    Collection<OverlayInfo> getOverlaysBySlideId(Long slideId);
}
