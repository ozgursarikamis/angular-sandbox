import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import * as mapbox from "mapbox-gl";

export type MapState = {
    map: mapbox.Map | null;
    regionsLayer?: mapbox.LayerSpecification;
    regionsSource?: mapbox.VectorSourceSpecification;
}

export const initialState: MapState = {
    map: null,
}

export const MapStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setMap: (map: mapbox.Map) => {
            return patchState(store, { map })
        },
        setRegionsLayer: (layer: mapbox.LayerSpecification) => {
            return patchState(store, { regionsLayer: layer })
        },
        setRegionsSource: (source: mapbox.VectorSourceSpecification) => {
            return patchState(store, { regionsSource: source })
        }
    }))
);