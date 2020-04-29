import React, {useEffect} from 'react';
import MapGL, {AttributionControl, Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useDataContext, useIDContext} from '../DataContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import StaffInfo from './Popup';
import SatelliteStyle from '../SatelliteStyle';

const style = {
    width: '20px',
    height: '20px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '20px',
    textAlign: 'center'
};

const navRightStyle = {
  position: 'absolute',
  top: 45,
  left: 0,
  padding: '10px',
  color: 'white'
};

const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
    </Marker>
);

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

export default function Map () {
    const [viewport, setViewport] = React.useState({
        longitude: 100.594699,
        latitude: 14.244686, 
        bearing: 0,
        zoom: 8
    })
    const [popupInfo, setPopupInfo] = React.useState(null);
    const [style, setStyle] = React.useState({
      map: true,
    });
  
    const handleChange = (event) => {
      setStyle({ ...style, [event.target.name]: event.target.checked });
    };

    const {data} = useDataContext();
    const {selectedID, getSelectedID} = useIDContext();

    useEffect(()=> {
      if(selectedID && selectedID.latitude){
        setViewport({...viewport, 
          latitude: selectedID.latitude, longitude: selectedID.longitude, zoom: 14
        })
        setPopupInfo(selectedID);
        getSelectedID(null);
      };
    });

    const onMarkerClick = (e) => {
        console.log(e);
        setPopupInfo(e);
    };
    const _renderPopup = () => {
        return (
          popupInfo && (
            <Popup
              tipSize={5}
              anchor="bottom"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeOnClick={true}
              onClose={() => setPopupInfo(null)}
              style={{
                  width: '300px !important'
              }}
            >
              <StaffInfo info={popupInfo} />
            </Popup>
          )
        );
    }
    
    if(!data) return null;
    return (
      <>
        <MapGL
        style={{ width: '100%', height: 'calc(100vh - 48px)' }}
        // mapStyle={
        //   "https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_th_black&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
        // }
        mapStyle={style.map ?
          "https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_th_black&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
          :SatelliteStyle
        }
        {...viewport}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        dragPan= {true}
        viewportChangeMethod={"flyTo"}
        viewportChangeOptions={1200}
        attributionControl={false}
        >
          
        <AttributionControl
          compact={false}
          position='bottom-right'
          customAttribution='Powered by Powermap'
        />
        {_renderPopup()}
        <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
            {data.map(point => (
            <Marker
                key={point.id}
                longitude={point.longitude}
                latitude={point.latitude}
            >
            <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                    cursor: 'pointer',
                    fill: '#d00',
                    stroke: 'none',
                    transform: `translate(0px,${SIZE}px)`
                }}
                onClick={() => onMarkerClick(point)}
                >
                <path d={ICON} />
            </svg>
            </Marker>
        ))}
        </Cluster>

        <NavigationControl showCompass showZoom position='top-right' />
        <FullscreenControl position='top-right' />
        <GeolocateControl position='top-right' fitBoundsOptions={{maxZoom: 14}}/>
        </MapGL>
        <div style={navRightStyle}>
          <FormControlLabel
            control={<Switch checked={style.map} onChange={handleChange} name="map" />}
            label={style.map?"MAP":"Satellite"}
          />
        </div>
      </>
    )

}
