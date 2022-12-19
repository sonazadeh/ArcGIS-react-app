import React, { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import MapWidgets from './MapWidgets';
import MapGraphics from './MapGraphics';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const MyMap = () => {

    const mapRef = useRef(null);
    const effectRun =  useRef(false);
    const [view ,setView] = useState(null);
    
    const glResult1 = new GraphicsLayer({
      id:'glResult1',
    });

    const glResult2 = new GraphicsLayer({
      id:'glResult2',
    });

    useEffect(() =>{
        
      if(effectRun.current === false){ 
        
       new MapView({
        container: mapRef.current,
        map: new Map({
            basemap: 'dark-gray',
            layers: [glResult1, glResult2]
        }),
        zoom: 3,

       }).when((view)=>{
        setView(view)
          });

        return () => {
            console.log('unmounted')
            effectRun.current = true
        }

      }
    },[]);

  return (
    <div ref={mapRef} style={{height:'100vh' ,width:'100%'}}>
       { view && (
       <>
       <MapWidgets view={view} />
       <MapGraphics view={view} />
       </>)}
    </div>
  )
}

export default MyMap