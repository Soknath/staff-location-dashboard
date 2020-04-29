const SatelliteStyle = {
        'version': 8,
        'sources': {
        'raster-tiles': {
        'type': 'raster',
        'tiles': [
        'https://mt0.google.com/vt/lyrs=y&hl=th&x={x}&y={y}&z={z}'
        ],
        'tileSize': 256,
        }
        },
        'layers': [
        {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22
        }
    ]
};

export default SatelliteStyle;