package com.visiblebrain.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Entity
@Table(name = "OverlayInformation")
public class OverlayInfo extends BaseEntity{
    @Column(name = "description", nullable = true)
    private String description;

    public String getDescription() {
        return description;
    }
    @ManyToOne(optional = false)
    @JoinColumn(name = "Slides", referencedColumnName = "id")
    @RestResource(exported = false)
    @JsonBackReference
    private Slide slide;
    public Slide getSlide() {
        return slide;
    }
    public void setSlide(Slide slide) {
        this.slide = slide;
    }
    @ManyToOne(optional = false)
    @JoinColumn(name = "Users", referencedColumnName = "id")
    @RestResource(exported = false)
    private User user;
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "parent", referencedColumnName = "id",nullable = true)
    @RestResource(exported = false)
    private OverlayInfo parent;

    public synchronized  List<OverlayPoint> getOverlayPoints() {
        return overlayPoints;
    }

    public synchronized void setOverlayPoints(List<OverlayPoint> overlayPoints) {
        this.overlayPoints = overlayPoints;

        for(OverlayPoint child : overlayPoints)
        {
            // initializing the TestObj instance in Children class (Owner side) so that it is not a null and PK can be created
            child.setOverlayInfo(this);
        }
    }

    @OneToMany(mappedBy="overlayInfo", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    @JsonManagedReference
    private List<OverlayPoint> overlayPoints= new ArrayList<OverlayPoint>();

    public OverlayInfo getOverlayInfo() {
        return parent;
    }
    public void setOverlayInfo(OverlayInfo parent) {
        this.parent = parent;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
