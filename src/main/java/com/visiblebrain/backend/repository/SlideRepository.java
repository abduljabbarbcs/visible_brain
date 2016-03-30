package com.visiblebrain.backend.repository;

import com.visiblebrain.backend.model.OverlayInfo;
import com.visiblebrain.backend.model.OverlayPoint;
import com.visiblebrain.backend.model.Slide;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Transactional
public interface SlideRepository extends JpaRepository<Slide, Long> {
    Collection<Slide> getSlidesByActiveAndType(Boolean active,String type);
    Slide getSlideByIdAndActive(Long id,Boolean active);
    Slide getSlideByTypeAndSlidePath(String type ,String slidePath);
}