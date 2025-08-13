import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, { Map, MapMouseEvent } from 'maplibre-gl';
import { environment } from 'src/environment/environment';
import {
  TerraDraw,
  TerraDrawPointMode,
  TerraDrawLineStringMode,
  TerraDrawPolygonMode,
  TerraDrawRectangleMode,
  TerraDrawCircleMode,
  TerraDrawSelectMode,
  TerraDrawFreehandLineStringMode,
  TerraDrawFreehandMode
} from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import type { Feature } from 'geojson';
import { FeatureId } from 'terra-draw/dist/extend';

const MAPTILER_KEY = environment.mapTilerKey;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map!: Map;
  private draw!: TerraDraw;
  public createdFeatures: Feature[] = [];
  public selectedFeature: FeatureId | null = null;

  ngAfterViewInit(): void {
    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      center: [0, 0],
      zoom: 0
    });

    this.map.on('load', () => {
      const adapter = new TerraDrawMapLibreGLAdapter({
        map: this.map,
        coordinatePrecision: 9,
      });

      this.draw = new TerraDraw({
        adapter,
        modes: [
          new TerraDrawSelectMode({
            styles: {
              selectedPolygonColor: "#000000ff",
              selectedPolygonFillOpacity: 0.27,
              selectedPolygonOutlineColor: "#ff9500ff",
              selectedPolygonOutlineWidth: 2,
            },
            allowManualDeselection: true,
            flags: {
              point: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                  },
                },
              },
              linestring: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    midpoints: { draggable: true },
                  },
                },
              },
              line: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    midpoints: { draggable: true },
                  },
                },
              },
              polygon: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: {
                      toLine: true,
                      toCoordinate: true
                    },
                    midpoints: { draggable: true },
                    // resizable: 'opposite-fixed',
                  },
                },
              },
              rectangle: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    resizable: 'center',
                  },
                },
              },
              circle: {
                feature: {
                  draggable: true,
                  coordinates: {
                    draggable: true,
                    deletable: true,
                    snappable: true,
                    resizable: 'center',
                  },
                },
              },
            },
          }),
          new TerraDrawPointMode(),
          new TerraDrawLineStringMode(),
          new TerraDrawPolygonMode({
            snapping: {
              toLine: true,
              toCoordinate: true,
            },
            styles: {
              fillColor: ({ properties }) => properties['currentlyDrawing'] ? "#dd3333ff" : "#3777dd",
              fillOpacity: 0.25,
              outlineColor: '#fff',
              outlineWidth: 4
            },
          }),
          new TerraDrawRectangleMode(),
          new TerraDrawCircleMode(),
          new TerraDrawFreehandLineStringMode({
            // snapping: true
          }),
          new TerraDrawFreehandMode(),
        ],
      });

      this.draw.on('change', (ids: FeatureId[], event: string) => {
        console.log({ ids, event });
        // const features = this.draw.getFeatures();
        const snapshot = this.draw.getSnapshot();
        const geometries = snapshot.map(features => features.geometry);

        console.log({ event, ids, snapshot, geometries });

        // Store the features in our component property
        this.createdFeatures = snapshot;
      });

      this.draw.on('select', (id: FeatureId) => {
        console.log({ id });
        this.selectedFeature = id;
      });

      this.draw.start();
    });

    this.map.on('mousemove', (event: MapMouseEvent) => {
      const { lng, lat } = event.lngLat;
      console.log({ lng, lat });
    })
  }

  ngOnDestroy(): void {
    if (this.draw) {
      this.draw.stop();
    }
    if (this.map) {
      this.map.remove();
    }
  }

  setMode(
    mode: 'select' | 'point' | 'linestring' | 'polygon' | 'rectangle' | 'circle' | 'freehand' | 'freehand-linestring'
  ): void {
    if (this.draw) {
      this.draw.setMode(mode);
    }
  }
}