import {useContext, createContext } from 'react';


export const AppContext = createContext({
    data: null,
    getData: () => {},
    selectId: null,
    getSelectedID: () => {},
    heatMap: null,
    getSelectedHeatMap: () => {},

})

export function useDataContext () {
    const {data, getData} = useContext(AppContext);
    return {data, getData};
}

export function useIDContext () {
    const {selectedID, getSelectedID, heatMap, getSelectedHeatMap} = useContext(AppContext);
    return {selectedID, getSelectedID, heatMap, getSelectedHeatMap};
}