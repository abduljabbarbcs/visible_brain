package com.visiblebrain.backend.controllers;
//import com.visiblebrain.backend.model.CurrentUser;
import com.visiblebrain.backend.model.User;
import com.visiblebrain.backend.service.slide.SlideService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.visiblebrain.backend.model.Slide;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@RestController
@RequestMapping(value="/api/slide")
@Api
public class SlideController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SlideController.class);
    private final SlideService slideService;

    @Autowired
    public SlideController(SlideService slideService) {
        this.slideService = slideService;
    }
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<Slide> getAll() {
        return slideService.getAllSlides();
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Slide getByID(@PathVariable("id") Long id) {
        return slideService.getSlideById(id);
    }

    @PreAuthorize("hasAuthority('hasRole('ROLE_ADMIN')'")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Slide create(@RequestBody Slide s) {
        return slideService.create(s);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Slide update(@PathVariable("id") long id, @RequestBody Slide s) {

        LOGGER.debug("ID: "+ id);
        return slideService.update(id, s);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public boolean delete(@PathVariable("id") long id){
        return slideService.delete(id);
    }
}
