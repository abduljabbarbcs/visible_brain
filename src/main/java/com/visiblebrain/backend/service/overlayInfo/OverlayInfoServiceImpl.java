package com.visiblebrain.backend.service.overlayInfo;

import com.visiblebrain.backend.model.OverlayInfo;
import com.visiblebrain.backend.model.OverlayPoint;
import com.visiblebrain.backend.repository.OverlayInfoRepository;
import com.visiblebrain.backend.repository.OverlayPointRepository;
import com.visiblebrain.backend.repository.SlideRepository;
import com.visiblebrain.backend.repository.UserRepository;
import com.visiblebrain.backend.service.user.UserService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Service
public class OverlayInfoServiceImpl implements OverlayInfoService {
    private static final Logger LOGGER = LoggerFactory.getLogger(OverlayInfoService.class);
    private final SlideRepository slideRepository;
    private final OverlayInfoRepository overlayInfoRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public OverlayInfoServiceImpl(OverlayInfoRepository overlayInfoRepository,SlideRepository slideRepository,UserService userService,UserRepository userRepository) {
        this.slideRepository = slideRepository;
        this.overlayInfoRepository = overlayInfoRepository;
        this.userService=userService;
        this.userRepository = userRepository;

    }

    @Override
    public OverlayInfo getOverlayInfoById(long id) {
        LOGGER.debug("Getting user={}", id);
        return overlayInfoRepository.findOne(id);
    }

    @Override
    public Collection<OverlayInfo> getOverlaysBySlideId(Long slideId) {
//        LOGGER.debug("Getting user by email={}", email.replaceFirst("@.*", "@***"));
        return overlayInfoRepository.getOverlaysBySlideId(slideId);
    }
    @Override
    public Collection<OverlayInfo> getAllOverlays() {
        LOGGER.debug("Getting all users");
        return overlayInfoRepository.findAll();
    }

    @Transactional
    @Override
    public OverlayInfo create(OverlayInfo form ) {
            OverlayInfo overlayInfo = new OverlayInfo();
            overlayInfo.setName(form.getName());
            overlayInfo.setZoom(form.getZoom());
            overlayInfo.setScale(form.getScale());
            overlayInfo.setDescription(form.getDescription());
            overlayInfo.setX(form.getX());
            overlayInfo.setY(form.getY());
            overlayInfo.setWidth(form.getWidth());
            overlayInfo.setHeight(form.getHeight());
            overlayInfo.setLineWidth(form.getLineWidth());
            overlayInfo.setColor(form.getColor());
            if (form.getOverlayInfo() != null) {
                if (form.getOverlayInfo().getId() > 0) {
                    System.out.println(form.getOverlayInfo().getId());
                    overlayInfo.setOverlayInfo(overlayInfoRepository.findOne((form.getOverlayInfo().getId())));
                }
            } else {
                overlayInfo.setOverlayInfo(null);
            }
            overlayInfo.setSlide(slideRepository.findOne(form.getSlide().getId()));
            if (userService.getLoggedInUser() == null) {
                overlayInfo.setUser(userRepository.findOne((long) 1));
            } else {
                overlayInfo.setUser(userService.getLoggedInUser());
            }
            overlayInfo.setOverlayPoints(form.getOverlayPoints());
        OverlayInfo savedOverlay = overlayInfoRepository.save(overlayInfo);
        return savedOverlay;
    }

    @Override
    public OverlayInfo update(OverlayInfo form )
    {
        OverlayInfo overlayInfo = getOverlayInfoById(form.getId());
        if(overlayInfo == null)
            return null;

        overlayInfo.setDescription(form.getDescription());

        OverlayInfo overlayInfoSaved = overlayInfoRepository.save(overlayInfo);
        return overlayInfoSaved;
    }

    @Override
    public boolean delete(Long id)
    {
        try {
            overlayInfoRepository.delete(id);
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }
}
