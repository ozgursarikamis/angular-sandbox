import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  GeolocateControl, LngLatLike, Map, MapOptions, NavigationControl, ProjectionSpecification,
  FullscreenControl,
  SourceSpecification,
  LayerSpecification,
  MapMouseEvent,
  Popup
} from 'mapbox-gl';
import { environment } from 'src/environments/environment';

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
  popup: Popup | undefined;

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
    });

    this.map.on('load', idleListener => {
      const { type, target } = idleListener;

      // add polygon MVT layer:
      const source = {
        type: 'vector',
        tiles: ['http://localhost:5000/api/polygon/regions/{z}/{x}/{y}.pbf']
      } as SourceSpecification
      this.map.addSource('regionSource', source);

      const layer = {
        id: 'regions_layer',
        type: 'fill',
        source: 'regionSource',
        'source-layer': 'source_layer_regions',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'fill-color': 'rgba(0, 0, 0, 0.4)',
        },
        slot: 'middle' // middle slot in Mapbox Standard style
      } as LayerSpecification;

      this.map.addLayer(layer);

      this.map.on('mousemove', (e) => {
        const features = this.map.queryRenderedFeatures(e.point, { layers: ['regions_layer'] });
        if (features.length > 0) {
          this.map.getCanvas().style.cursor = 'pointer';
          const properties = features[0].properties;
          if (properties) {
            const Name = properties['Name'];
            const Id = properties['Id'];

            if (!this.popup) {
              this.popup = new Popup({ offset: 1, anchor: 'top', closeButton: false, closeOnMove: true });
            }
            
            this.popup
              .setLngLat(e.lngLat)
              .setHTML(`<h3>${Id} - ${Name}</h3>`);

            if (!this.popup.isOpen()) {
              this.popup.addTo(this.map);
            }
          }
        } else {
          this.map.getCanvas().style.cursor = '';
          if (this.popup) {
            this.popup.remove();
            this.popup = undefined;
          }
        }
      });

      const borderLayer: LayerSpecification = {
        id: 'regions_layer_borders',
        type: 'line',
        source: 'regionSource',
        'source-layer': 'source_layer_regions',
        paint: {
          'line-color': '#000',
          'line-width': 2,
          "line-opacity": .9,
          "line-dasharray": [1, 1]
        },
        slot: 'middle'
      };
      this.map.addLayer(borderLayer);
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
