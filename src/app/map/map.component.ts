import { Component, OnInit } from '@angular/core';

import {
  AttributionControl, GeolocateControl,
  LngLatLike,
  Map,
  MapboxOptions, MapLayerMouseEvent, MapMouseEvent,
  Marker,
  MarkerOptions,
  NavigationControl,
  Offset,
  Popup,
  Projection
} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
// import { HelloWorldControl } from "../CustomControls/HelloWorldControl";
// import { MapService } from '../services/map.service';
// import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map | undefined;
  style = 'mapbox://styles/mapbox/outdoors-v12';
  centerLatitude = 53.55;
  centerLongitude = -0.15
  currentZoomLevel: number | undefined;
  mousePositionLat: number | undefined;
  mousePositionLng: number | undefined;
  constructor(
    // private MapService: MapService
  ) { }

  ngOnInit(): void {
    const token = environment.mapbox.accessToken;
    const center = [this.centerLongitude, this.centerLatitude] as LngLatLike;
    const projection = 'mercator' as unknown as Projection;

    const mapOptions: MapboxOptions = {
      accessToken: token,
      container: 'map',
      style: this.style,
      zoom: 5,
      center: center,
      projection: projection,
      attributionControl: false,
    };
    this.map = new Map(mapOptions);

    // const mapDraw = new MapboxDraw();
    // this.map.addControl(mapDraw, 'bottom-left');

    this.addControls()
    this.registerMapEvents();
    this.addMarker();
    // this.addPopup();
  }

  addPopup() {
    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };
    const popup = new Popup({ offset: popupOffsets as unknown as Offset, className: 'my-class' })
      .setLngLat([this.centerLongitude + 2, this.centerLatitude + 2])
      .setHTML("<h1>Hello World!</h1>")
      .setMaxWidth("300px");

    popup.addTo(this.map!);
  }

  addMarker() {
    const markerOptions: MarkerOptions = { draggable: true, color: 'orangered' };
    const marker = new Marker(markerOptions);
    marker.setLngLat([this.centerLongitude, this.centerLatitude]);

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/40/40/)';
    el.style.backgroundSize = '100%';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 0 10px rgba(0,0,0,0.4)';
    el.addEventListener('click', () => {
      window.alert('marker.properties.message');
    });

    const customMarker = new Marker(el);
    customMarker.setLngLat([this.centerLongitude + 2, this.centerLatitude + 2]);
    customMarker.addTo(this.map!);

    marker.on('dragstart', () => {
      console.log('DRAGSTART', marker.getLngLat());
    });
    marker.on('drag', () => {
      console.log('DRAG', marker.getLngLat());
    });
    marker.on('dragend', () => {
      console.log('DRAGEND', marker.getLngLat());
    });

    marker.setPopup(new Popup({ offset: 25 })
      .setHTML(`<h3>Lat ${this.mousePositionLat} / Long: ${this.mousePositionLng}</h3>`));
    marker.addTo(this.map!);
  }
  addControls() {
    const navigationControl = new NavigationControl({
      showZoom: true,
      showCompass: false
    });
    // this.map?.addControl(navigationControl);

    const attributeControl = new AttributionControl({
      customAttribution: 'SM'
    });
    this.map?.addControl(attributeControl);

    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });
    // this.map?.addControl(geolocateControl);

    // const helloWorldControl = new HelloWorldControl({
    //   onClick: () => {
    //     console.log(`Hello World from HelloWorldControl callee`);
    //   }
    // });
    // this.map?.addControl(helloWorldControl);
  }

  registerMapEvents() {
    this.map?.on('load', (event: MapMouseEvent) => {
      this.currentZoomLevel = Math.floor(event.target.getZoom());
      // this.MapService.addMuseumsLayer(this.map);
      // this.MapService.addContoursLayer(this.map);
    });
    this.map?.on('zoomend', (event: MapMouseEvent) => {
      this.currentZoomLevel = Math.floor(event.target.getZoom());
    });
    this.map?.on('mousemove', (event: MapMouseEvent) => {
      const coordinates = event.lngLat.wrap();
      this.mousePositionLat = coordinates.lat;
      this.mousePositionLng = coordinates.lng;
    });
    this.map?.on('contextmenu', (event: MapLayerMouseEvent) => {
      console.log('event :>> ', event.lngLat);
    });
  }
}
