import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, { Map } from 'maplibre-gl';

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
      center: [54.66, -2.47], // Turkey center
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
      this.map.addSource('countries-source', {
        type: 'vector',
        tiles: [
          'http://localhost:8080/data/Countries/{z}/{x}/{y}.pbf',
        ],
        // Optimization: Only request tiles where you know you have data
        minzoom: 6,
        maxzoom: 16
      });

      this.map.addSource('sponsors-source', {
        type: 'vector',
        tiles: [
          'http://localhost:8080/data/Sponsors/{z}/{x}/{y}.pbf',
        ],
        // Optimization: Only request tiles where you know you have data
        minzoom: 0,
        maxzoom: 20
      });

      // 2. ADD THE LAYERS

      this.map.addLayer({
        id: 'sponsors-heatmap',
        type: 'heatmap',
        source: 'sponsors-source',
        'source-layer': 'Sponsors',
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': 1,
          // Heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            16, 3
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparency color
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 0, 0)',
            0.2, '#88C198',
            0.4, '#E8E288',
            0.6, '#D89B5F',
            0.8, '#C76D6D',
            1, '#945151'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            16, 20
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 1,
            16, 0
          ],
        }
      });

      this.map.addLayer({
        id: 'organisations-layer',
        type: 'circle',
        source: 'organisations-source',
        'source-layer': 'Organisations',
        'paint': {
          'circle-color': '#ff0000',
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 0,
            16, 0.8
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14, 2,
            16, 6
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 1
        },
        minzoom: 14,
        maxzoom: 20
      });

      // 3. DEBUGGING: Check what's actually rendered
      this.map.on('sourcedata', (e) => {
        if (e.sourceId === 'sponsors-source' && e.isSourceLoaded) {
          const features = this.map.querySourceFeatures('sponsors-source', {
            sourceLayer: 'Sponsors'
          });
          console.log(`Organisations currently in view: ${features.length}`);
        }
      });

      // 4. INTERACTIVITY
      this.map.on('click', 'sponsors-layer', (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties;
          new maplibregl.Popup({ closeButton: false, closeOnClick: true })
            .setLngLat(e.lngLat)
            .setHTML(`${props['Name'] || 'N/A'}`)
            .addTo(this.map);
        }
      });

      // Change cursor on hover
      this.map.on('mouseenter', 'sponsors-layer', () => this.map.getCanvas().style.cursor = 'pointer');
      this.map.on('mouseleave', 'sponsors-layer', () => this.map.getCanvas().style.cursor = '');
    });

    this.map.on('sourcedata', (e) => {
      if (e.sourceId === 'sponsors-source' && e.isSourceLoaded) {
        const features = this.map.querySourceFeatures('sponsors-source', {
          sourceLayer: 'Sponsors'
        });
        if (features.length > 0) {
          console.log('Sponsors Feature Sample:', features[0]);
          console.log('Geometry Type:', features[0].geometry.type);
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
