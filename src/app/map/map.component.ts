import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, { Map, MapMouseEvent } from 'maplibre-gl';

import type { Feature } from 'geojson';

import { CustomControl } from "../controls/CustomControl";
import { environment } from 'src/environment/environment';

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
  public createdFeatures: Feature[] = [];

  ngAfterViewInit(): void {
    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      center: [35.2433, 38.9637], // Turkey center
      zoom: 5,
      hash: true,
    });
    this.map.showTileBoundaries = false;

    // Controls
    this.map.addControl(new maplibregl.NavigationControl());
    this.map.addControl(new maplibregl.FullscreenControl());
    this.map.addControl(new maplibregl.ScaleControl());
    // this.map.addControl(new maplibregl.TerrainControl({
    //   source: 'mapbox-terrain-v2'
    // }));
    this.map.addControl(new CustomControl(), 'bottom-right');
    // this.map.addControl(new maplibregl.LogoControl());

    this.map.on('load', () => {
      // 1. ADD THE SOURCE
      this.map.addSource('flood_layer-source', {
        type: 'vector',
        tiles: [
          'http://localhost:8080/data/floods_level_5/{z}/{x}/{y}.pbf',
        ],
        minzoom: 12,
        maxzoom: 18
      });

      // 2. ADD THE LAYER
      this.map.addLayer({
        id: 'flood_layer',
        type: 'fill',
        source: 'flood_layer-source',
        'source-layer': 'flood_polygons_level_5', // CRITICAL: This must match C# layer.Name
        'paint': {
          'fill-color': '#ff0000',
          'fill-opacity': 0.7,
          'fill-outline-color': '#000000'
        }
      });

      this.map.addLayer({
        id: 'flood_layer-line',
        type: 'line', // Lines ignore winding order!
        source: 'flood_layer-source',
        'source-layer': 'flood_polygons_level_5',
        'paint': {
          'line-color': '#00ffff',
          'line-width': .5
        }
      });

      // 3. DEBUGGING: Check what's actually rendered
      this.map.on('sourcedata', (e) => {
        if (e.sourceId === 'flood_layer-source' && e.isSourceLoaded) {
          const features = this.map.querySourceFeatures('flood_layer-source', {
            sourceLayer: 'flood_layer'
          });
          console.log(`Features currently in view: ${features.length}`);
        }
      });

      // 4. INTERACTIVITY
      this.map.on('click', 'flood_layer', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>FID:</b> ${props['fid']}<br><b>DN:</b> ${props['DN']}`)
            .addTo(this.map);
        }
      });

      // Change cursor on hover
      this.map.on('mouseenter', 'flood_layer', () => this.map.getCanvas().style.cursor = 'pointer');
      this.map.on('mouseleave', 'flood_layer', () => this.map.getCanvas().style.cursor = '');
    });

    this.map.on('sourcedata', (e) => {
      if (e.sourceId === 'flood_layer-source' && e.isSourceLoaded) {
        const features = this.map.querySourceFeatures('flood_layer-source', {
          sourceLayer: 'flood_layer'
        });
        if (features.length > 0) {
          console.log('Feature Sample:', features[0]);
          console.log('Geometry Type:', features[0].geometry.type);
          // console.log('Coordinates (First):', features[0].geometry.coordinates[0][0]);
          // If coordinates are [35.xxx, 38.xxx] here, your backend is sending Lat/Lng instead of tile units!
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
