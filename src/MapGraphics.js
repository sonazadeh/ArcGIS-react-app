import { useRef, useEffect, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import { faker } from "@faker-js/faker";

const MapGraphics = ({ view }) => {
  const formRef = useRef();

  faker.locale = "tr";
  const effectRun = useRef(false);
  let locations = [];
  const [state, setSate] = useState({
    name: "",
    address: "",
  });

  for (let index = 0; index < 100; index++) {
    locations.push({
      name: faker.name.fullName(),
      address: faker.address.streetAddress(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
    });
  }

  useEffect(() => {
    if (effectRun.current === false) {
      const glResult1 = view.map.findLayerById("glResult1");
      if (glResult1) {
        locations.map((location) => {
          const graph = new Graphic({
            geometry: {
              type: "point",
              latitude: location.latitude,
              longitude: location.longitude,
            },
            symbol: {
              type: "simple-marker",
              color: "red",
              size: 14,
            },
            attributes: {
              title: location.name,
              content: location.address,
            },
          });
          glResult1.add(graph);
        });
      }

      view.ui.add(formRef.current, "top-right");

      view.on("click", (event) => {
        console.log(event);

        view.hitTest(event).then((res) => {
          if (res.results.length > 0) {
            setSate({
              name: res.results[0].graphic.attributes.title,
              address: res.results[0].graphic.attributes.content,
            });
          }
        });
      });

      return () => {
        console.log("unmounted");
        effectRun.current = true;
      };
    }
  }, []);

  return (
    <div
      ref={formRef}
      className="esri-widget"
      style={{
        padding: 5,
        margin: 5,
      }}
    >
      <input type="text" value={state.name} className="esri-input" />
      <br />
      <br />
      <input type="text" value={state.address} className="esri-input" />
    </div>
  );
};

export default MapGraphics;
