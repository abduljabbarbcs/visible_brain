package com.visiblebrain.backend.controllers;

import com.visiblebrain.backend.model.OverlayInfo;
import com.visiblebrain.backend.service.overlayInfo.OverlayInfoService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@RestController
@RequestMapping(value="/api/overlay")
@Api
public class OverlayInfoController {
    private static final Logger LOGGER = LoggerFactory.getLogger(OverlayInfoController.class);
    private final OverlayInfoService overlayInfoService;

    @Autowired
    public OverlayInfoController(OverlayInfoService overlayInfoService) {
        this.overlayInfoService = overlayInfoService;
    }
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<OverlayInfo> getAll() {
        return overlayInfoService.getAllOverlays();
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<OverlayInfo>  getByID(@PathVariable("id") Long id) {
        return overlayInfoService.getOverlaysBySlideId(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public OverlayInfo create(@RequestBody OverlayInfo o) {
        return overlayInfoService.create(o);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public OverlayInfo update(@PathVariable("id") long id, @RequestBody OverlayInfo o) {

        LOGGER.debug("ID: "+ id);

        return overlayInfoService.update(id, o);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public boolean delete(@PathVariable("id") long id){
        return overlayInfoService.delete(id);
    }
}
