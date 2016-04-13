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

    public OverlayInfo getParent() {
        return parent;
    }

    public void setParent(OverlayInfo parent) {
        this.parent = parent;
    }

    public double getZoom() {
        return zoom;
    }

    public void setZoom(double zoom) {
        this.zoom = zoom;
    }

    @Column(name = "zoom", nullable = false)
    private double zoom ;

    public double getScale() {
        return scale;
    }

    public void setScale(double scale) {
        this.scale = scale;
    }

    @Column(name = "scale", nullable = false)
    private double scale ;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Column(name = "color", nullable = true)
    private String color;

    @Column(name = "x", nullable = false)
    private double x ;

    @Column(name = "y", nullable = false)
    private double y ;

    @Column(name = "width", nullable = false)
    private double width ;

    public double getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(double lineWidth) {
        this.lineWidth = lineWidth;
    }

    @Column(name = "lineWidth", nullable = false)
    private double lineWidth ;

    @Column(name = "height", nullable = false)
    private double height ;

    @Column(name = "screen_width", nullable = false)
    private double screen_width;

    public double getScreen_width() {
        return screen_width;
    }

    public void setScreen_width(double screen_width) {
        this.screen_width = screen_width;
    }

    public double getScreen_height() {
        return screen_height;
    }

    public void setScreen_height(double screen_height) {
        this.screen_height = screen_height;
    }

    @Column(name = "screen_height", nullable = false)
    private double screen_height ;
    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }
    //    public Image getImage() {
//        return image;
//    }
//
//    public void setImage(Image image) {
//        this.image = image;
//    }
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "Images", referencedColumnName = "id")
//    @RestResource(exported = false)
//    @JsonBackReference
//    private Image image;
}
