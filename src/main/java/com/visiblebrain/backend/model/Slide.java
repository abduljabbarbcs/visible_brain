package com.visiblebrain.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Entity
@Table(name = "Slides")
public class Slide extends BaseEntity{

    @Column(name = "description", nullable = true)
    private String description;
    @Column(name = "type", nullable = true)
    private String type;
    @Column(name = "slidePath", nullable = true)
    private String slidePath;
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getSlidePath() {
        return slidePath;
    }
    public void setSlidePath(String slidePath) {
        this.slidePath = slidePath;
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
    public synchronized List<OverlayInfo> getOverlayInfos() {
        return overlayInfos;
    }

    public synchronized void setOverlayInfos(List<OverlayInfo> overlayInfos) {
        this.overlayInfos = overlayInfos;

        for(OverlayInfo child : overlayInfos)
        {
            // initializing the TestObj instance in Children class (Owner side) so that it is not a null and PK can be created
            child.setSlide(this);
        }
    }

    @OneToMany(mappedBy="slide", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OverlayInfo> overlayInfos= new ArrayList<OverlayInfo>();
}
