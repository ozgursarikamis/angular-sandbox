import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { environment } from 'src/environment/environment';

const MAPTILER_KEY = environment.mapTilerKey;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      center: [0, 0],
      zoom: 0
    });
    console.log({ map });
  }
}

/*
// Replace {api_key} with your Maptiler key
  style: `https://api.maptiler.com/maps/streets/style.json?key={api_key}`
  style: `https://api.maptiler.com/maps/outdoor/style.json?key={api_key}`
  style: `https://api.maptiler.com/maps/basic/style.json?key={api_key}`
*/