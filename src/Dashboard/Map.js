import React from 'react';
import MapGL, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useDataContext} from '../DataContext';
import StaffInfo from './Popup';

const style = {
    width: '20px',
    height: '20px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '20px',
    textAlign: 'center'
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
        zoom: 15
    })
    const [popupInfo, setPopupInfo] = React.useState(null);

    const {data} = useDataContext();

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
        <MapGL
        style={{ width: '100%', height: '400px' }}
        mapStyle={
          "https://search.map.powermap.in.th/api/v2/map/vtile/styles?name=thailand_en&access_token=b378c575291af30a29f59919fd7e7e4c012d45c4"
        }
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        dragPan= {true}
        >
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
        <GeolocateControl position='top-right' />
        </MapGL>
    )

}
