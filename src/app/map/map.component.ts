import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  GeolocateControl, LngLatLike, Map, NavigationControl, ProjectionSpecification,
  FullscreenControl
} from 'mapbox-gl';
import { environment } from 'src/environment/environment';

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

  constructor() {
    this.map?.remove();
    this.mapContainer?.nativeElement.removeChild(this);
  }

  createMap() {
    const center = CENTER_COORDINATES as LngLatLike;
    const projection = 'globe' as unknown as ProjectionSpecification;

    this.map = new Map({
      accessToken: environment.MapboxAccessToken,
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      zoom: 6,
      center,
      projection,
      attributionControl: false,
      maxPitch: 60,
      hash: true
    });
    this.addControls();

    this.map.on('style.load', () => {
      console.log('style loaded');

      this.map.addSource('sponsor-source', {
        type: 'vector',
        tiles: [
          'https://localhost:5001/api/points/dccedcab-5aae-4cbd-9eba-6a8fdfd4f4d6/{z}/{x}/{y}.pbf',
        ],
      });
      this.map.addLayer({
        id: 'sponsor-layer',
        type: 'circle',
        source: 'sponsor-source',
        'source-layer': 'source_layer_sponsor',
        'paint': {
          'circle-color': '#00fbff',
          'circle-radius': 10,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 1
        },
      });
    });

    return this.map;
  }

  private addControls() {
    const navControl = new NavigationControl({ showCompass: true, showZoom: true });
    const controlPosition = 'bottom-right';
    this.map.addControl(navControl, controlPosition);

    const geoLocateControl = new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    });
    this.map.addControl(geoLocateControl, controlPosition);
    this.map.addControl(new FullscreenControl(), controlPosition);
  }

  ngAfterViewInit() {
    // Clean the map container before creating a new map instance
    const mapContent = this.mapContainer.nativeElement.firstChild;
    if (mapContent)
      this.mapContainer.nativeElement.removeChild(mapContent);

    this.createMap();
  }
}
