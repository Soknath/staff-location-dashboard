import {useContext, createContext } from 'react';


export const AppContext = createContext({
    data: null,
    getData: () => {},
    selectId: null,
    getSelectID: () => {}
})

export function useDataContext () {
    const {data, getData} = useContext(AppContext);
    return {data, getData};
}