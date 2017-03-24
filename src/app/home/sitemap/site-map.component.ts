import { OnInit, AfterViewInit, Component, ViewChild, ViewChildren, ElementRef, EventEmitter, Input, Output, Injector } from '@angular/core';
import 'js-marker-clusterer/src/markerclusterer.js';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


declare let jQuery: any;
declare var google: any;


@Component({
	selector: 'site-map',
	templateUrl: './site-map.component.html',
	styleUrls: ['./site-map.component.scss']
})

export class SiteMap implements AfterViewInit, OnInit {

  zoom: number = 3;

  lat: any = 51.673858;
  lng: any = 7.815982;

  markers: marker[];
  @ViewChild('map') _mapEl: ElementRef;

  _map: any;
  clusterer : any;
  stats = {
      TOTAL_LOCATIONS: 0,
      POOL_PER_SECOND: 0,
      ZERO_RESULTS : 0,
      SUCCESS : 0,
      OVER_QUERY_LIMIT : 0,
      ERROR: 0,
      ASYNC_REQUEST: 0,
      CACHE_REQUEST : 0,
      DURATION_TIME: 0
  };

  constructor(_elem: ElementRef, injector: Injector) {

  }

   removeGoogleBrand(time) {
    /*
         If you want remove google brand from map.
     */
    var me = this;
    let selarray = jQuery('#map .gm-style > div:not(:first-child, :last-child)');
    if (selarray.length > 0) {
      selarray.remove();
    } else {
      setTimeout(function() {
        me.removeGoogleBrand(time);
      }, time)
    }

  }

  ngOnInit() {
    var me = this;
    this.clusterer = false;
    this.markers = [];
    /* Simple style, you can customize your map as your convenience. */
    var styles =  [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#333333" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#e6e6e6" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }];

    this._map = new google.maps.Map(this._mapEl.nativeElement, {
      zoom: 3,
      minZoom: 1,
      center: { lat: this.lat, lng: this.lng },
      styles: styles,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false
    });

  }


  ngAfterViewInit() {
    //fix issue of resize  
    var me = this;
    google.maps.event.addListener(me._map, "idle", function() {
      google.maps.event.trigger(me._map, 'resize');
    });

    // removing google brand
    me.removeGoogleBrand(500);

  }


}


interface marker {
  id: string;
  lat: any;
  lng: any;
  locationValue: string;
  markerReference: any;
}

