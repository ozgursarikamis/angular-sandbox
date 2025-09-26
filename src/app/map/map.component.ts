import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  GeolocateControl, LngLatLike, Map, NavigationControl, ProjectionSpecification,
  FullscreenControl
} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { TerraDraw, TerraDrawPolygonMode, TerraDrawRectangleMode, TerraDrawSelectMode } from 'terra-draw';
import { TerraDrawMapboxGLAdapter } from 'terra-draw-mapbox-gl-adapter';
import { FeatureId } from 'terra-draw/dist/extend';

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
  draw!: TerraDraw;
  width!: string;
  public selectedFeature: FeatureId | null = null;

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

    this.map.on('load', () => {
      const adapter = new TerraDrawMapboxGLAdapter({
        map: this.map,
        coordinatePrecision: 9
      });
      this.draw = new TerraDraw({
        adapter,
        modes: [
          new TerraDrawSelectMode({
            allowManualDeselection: true,
            flags: {
              rectangle: {
                feature: {
                  draggable: false,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    midpoints: true,
                    resizable: 'center',
                  },
                },
              },
              polygon: {
                feature: {
                  draggable: false,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    midpoints: true,
                  },
                },
              },
            }
          }),
          new TerraDrawRectangleMode(),
          new TerraDrawPolygonMode()
        ]
      });

      this.draw.on('select', (id: FeatureId) => {
        this.selectedFeature = id;
        console.log('id', id);
      });
      this.draw.start();
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


  setMode(
    mode: 'select' | 'point' | 'linestring' | 'polygon' | 'rectangle' | 'circle' | 'freehand' | 'freehand-linestring'
  ): void {
    if (this.draw) {
      this.draw.setMode(mode);
    }
  }
}
