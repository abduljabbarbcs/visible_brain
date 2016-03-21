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
        overlayInfo.setDescription(form.getDescription());
        overlayInfo.setX(form.getX());
        overlayInfo.setY(form.getY());
        overlayInfo.setWidth(form.getWidth());
        overlayInfo.setHeight(form.getHeight());
        overlayInfo.setColor(form.getColor());
        if(form.getOverlayInfo()!=null) {
            if (form.getOverlayInfo().getId() > 0) {
                System.out.println(form.getOverlayInfo().getId());
                overlayInfo.setOverlayInfo(overlayInfoRepository.findOne((form.getOverlayInfo().getId())));
            }
        }
        else
        {
            overlayInfo.setOverlayInfo(null);
        }
        overlayInfo.setSlide(slideRepository.findOne(form.getSlide().getId()));
        if(userService.getLoggedInUser() == null)
        {
            overlayInfo.setUser(userRepository.findOne((long)1));
        }
        else {
            overlayInfo.setUser(userService.getLoggedInUser());
        }
        overlayInfo.setOverlayPoints(form.getOverlayPoints());
        OverlayInfo savedOverlay = overlayInfoRepository.save(overlayInfo);
        return savedOverlay;
    }

    @Override
    public OverlayInfo update(Long id, OverlayInfo o)
    {
        OverlayInfo overlayInfo = getOverlayInfoById(id);
        if(overlayInfo == null)
            return null;

        if(StringUtils.isNotEmpty(o.getName()))
            overlayInfo.setName(o.getName());
//        if(StringUtils.isNotEmpty(u.getPassword()) && u.getPassword()!=user.getPassword())
//            user.setPassword(new BCryptPasswordEncoder().encode(u.getPassword()));
//        if(u.getRole()!=null && u.getRole()!=user.getRole())
//            user.setRole(u.getRole());
//        if(StringUtils.isNotEmpty(u.getFirstName()) && u.getFirstName() != user.getFirstName()) {
//            user.setFirstName(u.getFirstName());
//        }
//        if(StringUtils.isNotEmpty(u.getLastName()) && u.getLastName() != user.getLastName()) {
//            user.setLastName(u.getLastName());
//        }

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
