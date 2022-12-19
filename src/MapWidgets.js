import  { useEffect,useRef } from 'react';
import Home from  '@arcgis/core/widgets/Home';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Compass from "@arcgis/core/widgets/Compass";
import Search from "@arcgis/core/widgets/Search";
import Weather from "@arcgis/core/widgets/Weather";



const MapWidgets = ({view}) => {

    const effectRun =  useRef(false);

    useEffect(()=>{

     if(effectRun.current === false){   
       view.ui.add(
        new Home({
            view: view,
        }),
        'top-left'
       );

       view.ui.add(
        new ScaleBar({
            view: view,
        }),
        'bottom-left'
       );

       view.ui.add(
        new Compass({
            view: view,
        }),
        'bottom-right'
       );

       view.ui.add(
        new Search({
            view: view,
        }),
        'top-right'
       );

       view.ui.add(
        new Weather({
            view: view,
        }),
        'top-left'
       );


       return () => {
        console.log('unmounted')
        effectRun.current = true
    }
    }
    },[]);

  return null
}

export default MapWidgets