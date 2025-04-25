import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { View } from "ol";
import { fromLonLat } from "ol/proj";

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  map!: Map;

  ngAfterViewInit() {
    if (!this.mapContainer) {
      console.error('Map container not found!');
      return;
    }

    // Create the OpenLayers map instance
    this.map = new Map({
      // Set the target element for the map
      target: this.mapContainer.nativeElement,
      // Define the layers for the map
      layers: [
        new TileLayer({
          // Use OpenStreetMap (OSM) as the tile source
          source: new OSM()
        })
      ],
      // Define the initial view of the map
      view: new View({
        // Center the map (longitude, latitude)
        // Use fromLonLat to convert coordinates from EPSG:4326 (LonLat) to EPSG:3857 (Web Mercator)
        center: fromLonLat([0, 0]), // Centered at [0, 0] (latitude, longitude)
        // Set the initial zoom level
        zoom: 2
      })
    });
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }
}
