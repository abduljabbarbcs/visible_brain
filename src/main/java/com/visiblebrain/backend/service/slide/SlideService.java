package com.visiblebrain.backend.service.slide;

import com.visiblebrain.backend.model.Slide;
import com.visiblebrain.backend.model.User;

import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
public interface SlideService {
    Slide getSlideById(long id);

//    Slide getSlideByEmail(String email);

    Collection<Slide> getAllSlides(String type);

    Collection<Slide> getTypeImages(String type);

    Slide create(Slide form);

    Slide update(Long id, Slide s);

    boolean delete(Long id);
}
