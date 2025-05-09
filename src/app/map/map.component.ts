import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GeolocateControl, LngLatLike, Map, MapOptions, Marker, NavigationControl, ProjectionSpecification } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf';
import { FeatureCollection } from 'geojson';

const CENTER_COORDINATES = [-2.40, 54.455] as LngLatLike

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  map!: Map;
  width!: string;
  style = 'mapbox://styles/mapbox/outdoors-v12';
  zoomToMarker: Marker | undefined;
  Draw: MapboxDraw = new MapboxDraw();

  constructor() {
    this.map?.remove();
    this.mapContainer?.nativeElement.removeChild(this);
  }

  createMap() {
    const center = CENTER_COORDINATES as LngLatLike;
    const projection = 'globe' as unknown as ProjectionSpecification;

    const mapOptions: MapOptions = {
      accessToken: environment.MapboxAccessToken,
      container: this.mapContainer.nativeElement,
      style: this.style,
      zoom: 6,
      center,
      projection: projection,
      attributionControl: false
    };
    this.map = new Map(mapOptions);
    this.addControls();

    this.map.on('style.load', () => {
      // this.add3DBuildings();
    });

    this.map.addControl(this.Draw!, 'top-left');

    const calculateArea = (e: any) => {
      const data: FeatureCollection = this.Draw!.getAll();
      const answer = document.getElementById('calculated-area');
      console.log('data', data);

      if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        answer!.innerHTML = `<strong>${rounded_area}</strong> square meters`;
      } else {
        answer!.innerHTML = '';
        if (e.type !== 'draw.delete')
          alert('Click the map to draw a polygon.');
      }
    }

    this.map.on('draw.create', calculateArea);
    this.map.on('draw.delete', calculateArea);
    this.map.on('draw.update', calculateArea);

    return this.map;
  }

  private addControls() {
    const navControl = new NavigationControl({ showCompass: true, showZoom: true });
    this.map.addControl(navControl, 'bottom-left');

    const geoLocateControl = new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    });
    this.map.addControl(geoLocateControl, 'top-right');
  }

  ngAfterViewInit() {
    // Clean the map container before creating a new map instance
    const mapContent = this.mapContainer.nativeElement.firstChild;
    if (mapContent)
      this.mapContainer.nativeElement.removeChild(mapContent);

    this.createMap();
  }
}
