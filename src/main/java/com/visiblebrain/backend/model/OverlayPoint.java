package com.visiblebrain.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;

/**
 * Created by Abdul Jabbar on 1/20/2016.
 */
@Entity
@Table(name = "OverlayPoints")
public class OverlayPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "x", nullable = false)
    private double x ;
    @ManyToOne(optional = true)
    @JoinColumn(name ="OverlayInformation_id")
    @RestResource(exported = false)
    @JsonBackReference
    private OverlayInfo overlayInfo;

    public double getX() {
        return x;
    }

    public OverlayInfo getOverlayInfo() {
        return overlayInfo;
    }

    public void setOverlayInfo(OverlayInfo overlayInfo) {
        this.overlayInfo = overlayInfo;
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setX(double x) {
        this.x = x;
    }
    @Column(name = "y", nullable = false)
    private double y ;

    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }

}
