import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GeolocateControl, LngLatLike, Map, MapOptions, Marker, NavigationControl, ProjectionSpecification } from 'mapbox-gl';
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
  style = 'mapbox://styles/mapbox/outdoors-v12';
  zoomToMarker: Marker | undefined;

  constructor() {
    this.map?.remove();
    this.mapContainer?.nativeElement.removeChild(this);
  }
    createMap() {
    const center = CENTER_COORDINATES as LngLatLike;
    const projection = 'globe' as unknown as ProjectionSpecification;

    const mapOptions: MapOptions = {
      accessToken: environment.MapboxAccessToken,
      container: this.mapContainer.nativeElement,
      style: this.style,
      zoom: 6,
      center,
      projection: projection,
      attributionControl: false
    };
    this.map = new Map(mapOptions);
    this.addControls();

    this.map.on('style.load', () => {
      // this.add3DBuildings();
    });

    return this.map;
  }

    private addControls() {
    const navControl = new NavigationControl({ showCompass: true, showZoom: true });
    this.map.addControl(navControl, 'bottom-left');

    const geoLocateControl = new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    });
    this.map.addControl(geoLocateControl, 'top-right');
  }

  ngAfterViewInit() {
    // Clean the map container before creating a new map instance
    const mapContent = this.mapContainer.nativeElement.firstChild;
    if (mapContent)
      this.mapContainer.nativeElement.removeChild(mapContent);

    this.createMap();
  }
}
