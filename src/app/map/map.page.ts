import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { NavController, Platform, IonRefresher } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import Geolocation from 'ol/Geolocation'
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer}  from 'ol/layer';
import {OSM, Vector as VectorSource}  from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import 'ol/ol.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

   map : Map
   geolocation : Geolocation
   view : View
   checked : Boolean 

  constructor() {}
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  @ViewChild('refresherRef', {static : false}) refresherRef : IonRefresher
  ngOnInit() {
    this.initMap();
    console.log("OnInit")
    this.doRefresh(this.refresherRef)
  }

  ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement);
    console.log("AfterViewInit")
  }

  initMap(){
    this.view = new View({
      center: [44.0167, 1.35],
      zoom : 2 
    }),

     this.map = new Map({
      target : 'map',
      layers : [
        new TileLayer({
          source : new OSM()
        })
      ],
      view : this.view
      }),

    this.geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.view.getProjection()
      })
    console.log('END Geolocation')

    this.el('track').addEventListener('change', this.myFunction);

    console.log(this.geolocation.getTracking())
    console.log(this.geolocation.setTracking())
  
}

  myFunction(event){
    if(typeof event.cancelable !== 'boolean' || event.cancelable){
      console.log('In myFunction')
      this.geolocation.getTracking(this.checked);
      event.preventDefault();
    }else{
      console.warn(`The following event couldn't be canceled:`);
      console.dir(event)
    }

    
  }

  el(id : any) {
    return document.getElementById(id);
  }

  getInfo(){
    // update the HTML page when the position changes.
this.geolocation.on('change', function() {
  this.el('accuracy').innerText = this.geolocation.getAccuracy() + ' [m]';
  this.el('altitude').innerText = this.geolocation.getAltitude() + ' [m]';
  this.el('altitudeAccuracy').innerText = this.geolocation.getAltitudeAccuracy() + ' [m]';
  this.el('heading').innerText = this.geolocation.getHeading() + ' [rad]';
  this.el('speed').innerText = this.geolocation.getSpeed() + ' [m/s]';
});

// handle geolocation error.
this.geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new Feature();
this.geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
});

var positionFeature = new Feature();
positionFeature.setStyle(new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#3399CC'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

this.geolocation.on('change:position', function() {
  var coordinates = this.geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
    new Point(coordinates) : null);
});
}

doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    this.refresherRef.complete();
  }, 2000);
}

  
}