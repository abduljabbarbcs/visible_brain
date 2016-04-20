package com.visiblebrain.backend.service.slide;

//import com.visiblebrain.backend.model.CurrentUser;
import com.visiblebrain.backend.model.OverlayInfo;
import com.visiblebrain.backend.model.OverlayPoint;
import com.visiblebrain.backend.model.Slide;
import com.visiblebrain.backend.model.User;
import com.visiblebrain.backend.repository.SlideRepository;
import com.visiblebrain.backend.repository.UserRepository;
//import com.visiblebrain.backend.service.currentuser.CurrentUserService;
import com.visiblebrain.backend.service.user.UserService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Service
public class SlideServiceImpl implements SlideService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SlideServiceImpl.class);

    private final SlideRepository slideRepository;
    private final UserService userService;
    @Autowired
    public SlideServiceImpl(SlideRepository slideRepository,UserService userService) {
        this.slideRepository = slideRepository;
        this.userService= userService;
    }
    @Override
    public Slide getSlideById(long id) {
        LOGGER.debug("Getting user={}", id);
        return slideRepository.getSlideByIdAndActive(id,true);
    }

//    @Override
//    public Slide getSlideByEmail(String email) {
//        LOGGER.debug("Getting user by email={}", email.replaceFirst("@.*", "@***"));
//        return slideRepository.findOneByEmail(email);
//    }

    @Override
    public Collection<Slide> getAllSlides() {
        LOGGER.debug("Getting all users");
        Collection<Slide> slides= slideRepository.getSlidesByActiveAndType(true,"slide");
        Collection<Slide> temp = new ArrayList<Slide>();
        for(Slide s : slides)
        {
            s.setOverlayInfos(new ArrayList<OverlayInfo>());
            s.setUser(null);
            temp.add(s);
        }
        return temp;
    }
    @Override
    public Collection<Slide> getTypeImages(String type) {
        LOGGER.debug("Getting all users");
        Collection<Slide> images = slideRepository.getSlidesByActiveAndType(true,type);
        Collection<Slide> temp = new ArrayList<Slide>();
        for(Slide image : images)
        {
            if(!(image.getOverlayInfos().isEmpty()))
            {
                temp.add(image);
            }
        }
        return temp;
    }

    @Transactional
    @Override
    public Slide create(Slide form) {
        Slide slide = new Slide();
        slide.setName(form.getName());
        slide.setDescription(form.getDescription());
        slide.setType(form.getType());
        slide.setSlidePath(form.getSlidePath());
        slide.setUser(userService.getLoggedInUser());
        Slide savedSlide = slideRepository.save(slide);
        return savedSlide;
    }

    @Override
    public Slide update(Long id, Slide s)
    {
        Slide slide = getSlideById(id);
        if(slide == null)
            return null;
        if(StringUtils.isNotEmpty(s.getName()))
            slide.setName(s.getName());
        if(StringUtils.isNotEmpty(s.getDescription()))
            slide.setDescription(s.getDescription());
        Slide slideSaved = slideRepository.save(slide);
        return slideSaved;
    }

    @Override
    public boolean delete(Long id)
    {
        try {
            Slide slide=getSlideById(id);
            slide.setActive(false);
            slideRepository.save(slide);
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }
}
