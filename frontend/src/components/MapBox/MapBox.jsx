// display popup on click
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import park from '../../assets/park.svg'
import junction from '../../assets/junction.svg'
import dollar_img from '../../assets/dollar_img.svg'
import * as turf from "@turf/turf";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapBox.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsaWtuYXNlZXIxMjMiLCJhIjoiY2xyeXMyanFxMXEwazJrcXYzYTF3b2tzayJ9.ztggMSYLNixVHhD8bxgKUw";
const MapBox = (props) => {
  // const [map, setMap] = useState(null);
  const [map, setMap] = useState(null);
  // correct code
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFsaWtuYXNlZXIxMjMiLCJhIjoiY2xyeXMyanFxMXEwazJrcXYzYTF3b2tzayJ9.ztggMSYLNixVHhD8bxgKUw";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [-74.5, 40], // Starting position [lng, lat]
      center:
        props.type === "user"
          ? [props?.coordinates?.longitude, props?.coordinates?.latitude]
          : // : [72.993, 33.6425], // Starting position [lng, lat]
            [-74.006, 40.7128], // Starting position [lng, lat]
      zoom: props.type === "user" ? 15.5 : 15, // Starting zoom
      pitch: 60,
    });
    
    (props?.displayName!=='' && props.type==="user") && new mapboxgl.Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${props?.displayName}</p>`)); // Set the popup content
    props?.showData &&  props?.showData?.forEach(item => {
        // const coordinates = item.Coordinates;
        // const buildingName = item.BuildingName;
    
        // Add the custom marker to the map
        // Create a new marker
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.backgroundImage = `url(${dollar_img})`;
      markerElement.style.width = '30px'; // Set width of the marker
      markerElement.style.height = '30px'; // Set height of the marker
        new mapboxgl.Marker(markerElement)
            .setLngLat([item?.Coordinates.longitude, item?.Coordinates.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<p>${item?.BuildingName}</p>`)) // Set the popup content
            .addTo(map);
          });

    const draw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.doubleClickZoom.disable();

    // map.addControl(draw);
    // let polygon = null;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
      marker: true, // Disable adding a marker for the searched location
    });

    map.addControl(geocoder, "top-left");
    // calculating the center point of polygoncoordinates
    // const calculateCentroid = (polygonCoordinates) => {
    //   let xSum = 0;
    //   let ySum = 0;

    //   // Iterate through all the vertices of the polygon
    //   for (let i = 0; i < polygonCoordinates.length; i++) {
    //     let vertex = polygonCoordinates[i];
    //     xSum += vertex[0]; // Add x-coordinate
    //     ySum += vertex[1]; // Add y-coordinate
    //   }

    //   // Calculate centroid coordinates
    //   let centroidX = xSum / polygonCoordinates.length;
    //   let centroidY = ySum / polygonCoordinates.length;
    //   props?.setCoordinates({ longitude: centroidX, latitude: centroidY });

    //   return [centroidX, centroidY];
    // };

    // map.on("draw.create", (e) => {
    //   polygon = e.features[0];
    //   let polygonCoordinates = polygon.geometry.coordinates[0];
    //   const centroid = calculateCentroid(polygonCoordinates);

    //   const area = turf.area(polygon.geometry);
    //   alert(`Area of the polygon: ${area} square meters`);
    // });

    map.on("load", () => {
      // setMap(mapInstance);
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#637d6a",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      });

      // mapInstance.on('click', handleMapClick);
    });
    map.on("load", () => {
      setMap(map);
      fetchPlacesAndAddMarkers(map);
    });
    map.on("click", async (e) => {
      // const geocodingClient = MapboxGeocoding({
      //   accessToken: mapboxgl.accessToken,
      // });
      const coordinates = e.lngLat;
      if (coordinates && props.type === "admin") {
        props?.setAdminCoordinates({
          longitude: coordinates.lng,
          latitude: coordinates.lat,
        });
      }
      let mapboxAccessToken = mapboxgl.accessToken;
      // Construct the URL for reverse geocoding
      const reverseGeocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxAccessToken}`;

      // Fetch data from the Mapbox Geocoding API
      fetch(reverseGeocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("the data is",data)
          // Extract building name or other relevant information from the response
          if (data.features && data.features.length > 0 && props.type==='admin') {
            console.log("the data is",data.features)
            const buildingName = data.features[0].text; // Example: Retrieve the text of the first feature
            props.setData({ ...props.data, building_name: buildingName });
          } else {
            console.log("Building information not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching building information:", error);
        });
    });

    return () => map.remove();
  }, [props?.coordinates]);

  const fetchPlacesAndAddMarkers = (map) => {
    // Fetch parks data using Mapbox Places API

    fetchPlaces("park", map.getCenter()).then((parksData) => {
      // Add markers for parks
      addMarkersToMap(parksData.features, "park", map);
    });

    // Fetch junctions data using Mapbox Places API
    fetchPlaces("junction", map.getCenter()).then((junctionsData) => {
      // Add markers for junctions
      addMarkersToMap(junctionsData.features, "junction", map);
    });
  };

  const fetchPlaces = async (type, center) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?access_token=${mapboxgl.accessToken}&proximity=${center.lng},${center.lat}&limit=10`
    );
    const data = await response.json();
    return data;
  };

  const addMarkersToMap = (features, type, map) => {
    features.forEach((feature) => {
      const color = type === "park" ? "green" : "red";
      let image = type === "park" ? park : junction; // Set image paths based on type
      
      // Create a new marker
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.backgroundImage = `url(${image})`;
      markerElement.style.width = '30px'; // Set width of the marker
      markerElement.style.height = '30px'; // Set height of the marker

      // Add marker to the map
      new mapboxgl.Marker(markerElement)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ closeOnClick: false, maxWidth: '300px', width: "50px" }).setHTML(`<p >${color === "green" ? 'Park' : 'Junction'}</p>`))
          .addTo(map);
  });
    // features.forEach((feature) => {
    //   const color = type === "park" ? "green" : "red";
    //   let image = type === "park" ? park : null;
    //   new mapboxgl.Marker({color: color,})
    //     .setLngLat(feature.geometry.coordinates)
    //     .setPopup(new mapboxgl.Popup({ closeOnClick: false,maxWidth:'300px',width:"50px" }).setHTML(`<p >${color==="green"?'Park':'Junction'}</p>`))
    //     .addTo(map);
    // });
  };

  return (
    <div>
      <div id="map" className="map" />
    </div>
  );
};
export default MapBox;
