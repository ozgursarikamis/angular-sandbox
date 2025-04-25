import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { View } from "ol";
import { fromLonLat } from "ol/proj";

import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import { Style, Fill, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";

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

    const regionVectorTileSource = new VectorTileSource({
      format: new MVT(),
      url: 'http://localhost:5000/api/VectorLayers/regions/{z}/{x}/{y}.pbf',
    });

    const style = function (feature: FeatureLike): Style {
      console.log({ feature });
      const id = feature.get('Id');
      const color = `rgb(${(id * 37) % 255}, ${(id * 73) % 255}, ${(id * 17) % 255}, 0.5)`;
      const stroke = new Stroke({ color: 'wheat', width: 1, });
      const fill = new Fill({ color });

      return new Style({ fill, stroke });
    };
    const regionsLayer = new VectorTileLayer({
      source: regionVectorTileSource,
      style
    });

    const osmTileLayerOptions = { source: new OSM() };
    const osmTileLayer: TileLayer<OSM> = new TileLayer(osmTileLayerOptions);

    const viewOptions = { center: fromLonLat([-2.40, 54.455]), zoom: 7 };
    const view = new View(viewOptions);

    const mapOptions = {
      target: this.mapContainer.nativeElement,
      layers: [osmTileLayer, regionsLayer],
      view,
    };
    this.map = new Map(mapOptions);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.setTarget(undefined);
    }
  }
}
