import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  GeolocateControl, LngLatLike, Map, NavigationControl, ProjectionSpecification,
  FullscreenControl,
  Popup,
  MapMouseEvent,
  MapEvent,
  GeoJSONFeature
} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { RegionLayerProperties, BORDER_LAYER as REGIONS_BORDER_LAYER, REGIONS_LAYER, REGIONS_SOURCE } from '../layers.config';
import { MapStore } from '../state/MapStore';

const CENTER_COORDINATES = [-2.40, 54.455] as LngLatLike;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private mapStore = inject(MapStore);
  map!: Map;
  width!: string;
  popup: Popup | undefined;

  constructor() {
    this.map?.remove();
    this.mapContainer?.nativeElement.removeChild(this);
  }

  createMap(): mapboxgl.Map {
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
      // console.log('style loaded');
    });

    this.map.on('load', (event: MapEvent) => {
      this.RegionLayerEvents();
    });

    return this.map;
  };

  RegionLayerEvents() {
    if (REGIONS_LAYER.source && REGIONS_LAYER.id) {
      // add polygon MVT layer:
      if (!this.map.getSource(REGIONS_LAYER.source) && !this.map.getLayer(REGIONS_LAYER.id)) {
        this.map.addSource(REGIONS_LAYER.source ?? '', REGIONS_SOURCE);
        this.map.addLayer(REGIONS_LAYER);
        this.map.addLayer(REGIONS_BORDER_LAYER);
      }
    }

    this.map.on('mousemove', this.regionLayerMouseMove);
  }

  private regionLayerMouseMove = (e: MapMouseEvent) => {
    this.map.queryRenderedFeatures(e.point, { layers: [REGIONS_LAYER.id, REGIONS_BORDER_LAYER.id] })
      .forEach((feature: GeoJSONFeature) => {
      const { geometry, properties, layer } = feature;
      const { Name, Id } = properties as RegionLayerProperties;

      if (!this.popup) {
        this.popup = new Popup({ offset: 1, anchor: 'top', closeButton: false, closeOnMove: true });
      }

      this.popup
        .setLngLat(e.lngLat)
        .setHTML(`<span>${layer?.id}: ${Id} - ${Name}</span>`);

      if (!this.popup.isOpen()) {
        this.popup.addTo(this.map);
      }
    });
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

    this.mapStore.setMap(this.createMap());
  }
}