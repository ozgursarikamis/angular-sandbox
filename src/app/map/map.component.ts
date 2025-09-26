import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  GeolocateControl, LngLatLike, Map, NavigationControl, ProjectionSpecification,
  FullscreenControl
} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { TerraDraw, TerraDrawPolygonMode, TerraDrawRectangleMode, TerraDrawSelectMode, ValidateMaxAreaSquareMeters, ValidateNotSelfIntersecting } from 'terra-draw';
import { TerraDrawMapboxGLAdapter } from 'terra-draw-mapbox-gl-adapter';
import { OnFinishContext } from 'terra-draw/dist/common';
import { FeatureId } from 'terra-draw/dist/extend';

const CENTER_COORDINATES = [-2.40, 54.455] as LngLatLike
export type Color_Hex = `#${string}`;

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
          new TerraDrawRectangleMode(),
          new TerraDrawPolygonMode({
            snapping: {
              toLine: true,
              toCoordinate: true,
            },
            pointerDistance: 100,
            editable: true,
            showCoordinatePoints: true, // Set to true to see coordinate point styling
            keyEvents: {
              cancel: 'c',
              finish: 'f'
            },
            cursors: {
              start: 'crosshair',
              close: 'pointer',
            },
            styles: {
              fillColor: '#F00',
              fillOpacity: .5,
              outlineColor: '#DDD',
              outlineWidth: 2,
              snappingPointOutlineColor: '#ee0053ff',
              coordinatePointWidth: 5,
              coordinatePointColor: '#FFF',
              coordinatePointOutlineColor: '#4D90FC',
              coordinatePointOutlineWidth: 1,
              closingPointColor: '#4D90FC',
              closingPointWidth: 5,
              closingPointOutlineColor: '#FFF',
              closingPointOutlineWidth: 1,
            },
            validation: ValidateNotSelfIntersecting
          }),
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
          })
        ],
      });

      this.draw.on('select', (id: FeatureId) => {
        this.selectedFeature = id;
        // console.log('id', id);
        console.log('getSnapshotFeature', this.draw.getSnapshotFeature(id));
      });
      this.draw.on('change', (ids: FeatureId[], event: string) => {

      });
      this.draw.on('finish', (featureId: FeatureId, context: OnFinishContext) => {
        const { action, mode } = context;
        console.log({ action, mode, featureId });
        const feature = this.draw.getSnapshotFeature(featureId);
        console.log({ 
          id: feature?.id, 
          geometry: feature?.geometry, 
          bbox: feature?.bbox,
          properties: feature?.properties,
          feature
        });
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
class CompositeValidation {
  constructor(private readonly rules: any[]) {}
  validate(feature: any) {
    for (const r of this.rules) {
      const res = r.validate(feature);
      if (res && res.valid === false) return res;
    }
    return { valid: true };
  }
}