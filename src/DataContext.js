import {useContext, createContext } from 'react';


export const AppContext = createContext({
    data: null,
    getData: () => {},
    selectId: null,
    getSelectedID: () => {},
})

export function useDataContext () {
    const {data, getData} = useContext(AppContext);
    return {data, getData};
}

export function useIDContext () {
    const {selectedID, getSelectedID} = useContext(AppContext);
    return {selectedID, getSelectedID};
}