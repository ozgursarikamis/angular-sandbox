import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Map, Popup } from "mapbox-gl";

export type MapState = {
    map: Map | null;
    popups?: {
        [id: string]: Popup;
    }[];
}

export const initialState: MapState = {
    map: null,
}

export const MapStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setMap: (map: Map) => {
            return patchState(store, { map })
        },
        getMap() {
            return store.map;
        }
    }))
);