import { LayerSpecification, SourceSpecification } from "mapbox-gl";

export const REGIONS_SOURCE: SourceSpecification = {
  type: 'vector',
  tiles: ['http://localhost:5000/api/polygon/regions/{z}/{x}/{y}.pbf']
};

export const REGIONS_LAYER: LayerSpecification = {
  id: 'regions_layer',
  type: 'fill',
  source: 'regionSource',
  'source-layer': 'source_layer_regions',
  'paint': {
    'fill-color': 'rgba(0, 0, 0, 0.4)',
  },
  slot: 'middle'
};

export const BORDER_LAYER: LayerSpecification = {
  id: 'regions_layer_borders',
  type: 'line',
  source: REGIONS_LAYER.source,
  'source-layer': 'source_layer_regions',
  'paint': {
    'line-color': 'red',
    'line-width': 1,
    "line-opacity": 1,
    "line-dasharray": [1, 1]
  },
  slot: 'top'
};

export type RegionLayerProperties = { Name?: string, Id: number };