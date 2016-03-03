package com.visiblebrain.backend.service.overlayInfo;

import com.visiblebrain.backend.model.OverlayInfo;
import com.visiblebrain.backend.model.Slide;


import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
public interface OverlayInfoService {
    OverlayInfo getOverlayInfoById(long id);

    Collection<OverlayInfo> getOverlaysBySlideId(Long slideId);

    Collection<OverlayInfo> getAllOverlays();

    OverlayInfo create(OverlayInfo form);

    OverlayInfo update(Long id, OverlayInfo o);

    boolean delete(Long id);
}
