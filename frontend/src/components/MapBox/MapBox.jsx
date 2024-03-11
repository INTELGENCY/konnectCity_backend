// display popup on click
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import park from "../../assets/park.svg";
import junction from "../../assets/junction.svg";
import dollar_img from "../../assets/dollar_img.svg";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./MapBox.css";
import { Button, Card, CardContent, Typography } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useNavigate } from "react-router-dom";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFsaWtuYXNlZXIxMjMiLCJhIjoiY2xyeXMyanFxMXEwazJrcXYzYTF3b2tzayJ9.ztggMSYLNixVHhD8bxgKUw";
const MapBox = (props) => {
  // const [map, setMap] = useState(null);
  const [map, setMap] = useState(null);
  const [sidebarInfo, setSidebarInfo] = useState(null);
  const navigate = useNavigate();

  const openSidebar = (info) => {
    setSidebarInfo(info);
  };

  const closeSidebar = () => {
    setSidebarInfo(null);
  };
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
          : // : [45.0792, 23.8859], // Starting position [lng, lat]
            [-74.006, 40.7128], // Starting position [lng, lat]
      // [72.993, 33.6425], // Starting position [lng, lat] Nust Coordinates
      zoom: props.type === "user" ? 15.5 : 15, // Starting zoom
      pitch: 60,
    });
    // for showing building detail when user click on view button
    if (
      props.type === "user" &&
      props &&
      props.buildingDetail &&
      props.buildingDetail
    ) {
      const popupContent = document.createElement("div");

      // for display a image in the card

      // Create an image element and set its attributes
      const image = document.createElement("img");
      image.src = props?.buildingDetail?.Img_Url[0]; // Assuming you have a imageUrl property in your item object
      image.alt = "Building Image";
      image.style.minWidth = "220px"; // Adjust width as needed
      image.style.maxHeight = "150px"; // Adjust height as needed
      image.style.objectFit = "cover"; // Adjust object-fit as needed
      image.style.borderRadius = "10px"; // add border radius in image

      // Create a paragraph element for building name
      const buildingName = document.createElement("div");
      buildingName.textContent = "Name: " + props?.buildingDetail?.BuildingName;
      buildingName.style.fontWeight = "bold";
      buildingName.style.fontSize = "15px";
      buildingName.style.marginTop = "10px";

      // Create a paragraph element for other details
      const Price = document.createElement("div");
      Price.textContent = `Price: ${props?.buildingDetail?.Price}`;
      const Resold = document.createElement("div");
      Resold.textContent = `Resold: ${props?.buildingDetail?.Stats?.Resold}`;
      const Ads = document.createElement("div");
      Ads.textContent = `Ads: ${props?.buildingDetail?.Stats?.Ads}`;
      const TopAds = document.createElement("div");
      TopAds.textContent = `TopAds: ${props?.buildingDetail?.Stats?.TopAds}`;

      // Append image and other details to the popup content
      popupContent.appendChild(image);
      popupContent.appendChild(buildingName);
      popupContent.appendChild(Price);
      popupContent.appendChild(Resold);
      popupContent.appendChild(Ads);
      popupContent.appendChild(TopAds);
      popupContent.addEventListener("mouseenter", () => {
        popupContent.style.cursor = "pointer";
      });

      popupContent.addEventListener("mouseenter", () => {
        popupContent.classList.add("hovered");
      });
      popupContent.addEventListener("click", () => {
        openSidebar(props?.buildingDetail);
      });
      const popup = new mapboxgl.Popup().setDOMContent(popupContent);
      popup
        .setLngLat({
          lng: props?.coordinates?.longitude,
          lat: props?.coordinates?.latitude,
        })
        .addTo(map);
    }

    // for showing building detail when user click on view button

    // if (props?.coordinates) {
    //   new mapboxgl.Popup()
    //     .setLngLat({
    //       lng: props?.coordinates?.longitude,
    //       lat: props?.coordinates?.latitude,
    //     })
    //     .setHTML(`<p>Building for sale</p>`)
    //     .addTo(map);
    // }

    props?.displayName !== "" &&
      props.type === "user" &&
      new mapboxgl.Marker()
        .setLngLat(map.getCenter())
        .addTo(map)
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${props?.displayName}</p>`)); // Set the popup content
    props?.showData &&
      props?.showData?.forEach((item) => {
        // Add the custom marker to the map
        // Create a new marker
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        markerElement.style.backgroundImage = `url(${dollar_img})`;
        markerElement.style.width = "30px"; // Set width of the marker
        markerElement.style.height = "30px"; // Set height of the marker
        // new mapboxgl.Marker(markerElement)
        //   .setLngLat([item?.Coordinates.longitude, item?.Coordinates.latitude])
        //   .setPopup(
        //     new mapboxgl.Popup().setHTML(`<p>${item?.BuildingName}</p>`)
        //   ) // Set the popup content
        //   .addTo(map);
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([item?.Coordinates.longitude, item?.Coordinates.latitude])
          .addTo(map);

        // for display a image in the card
        const popupContent = document.createElement("div");

        // Create an image element and set its attributes
        const image = document.createElement("img");
        image.src = item.Img_Url[0]; // Assuming you have a imageUrl property in your item object
        image.alt = "Building Image";
        image.style.minWidth = "220px"; // Adjust width as needed
        image.style.maxHeight = "150px"; // Adjust height as needed
        image.style.objectFit = "cover"; // Adjust object-fit as needed
        image.style.borderRadius = "10px"; // add border radius in image

        // Create a paragraph element for building name
        const buildingName = document.createElement("div");
        buildingName.textContent = "Name: " + item?.BuildingName;
        buildingName.style.fontWeight = "bold";
        buildingName.style.fontSize = "15px";
        buildingName.style.marginTop = "10px";

        // Create a paragraph element for other details
        const Price = document.createElement("div");
        Price.textContent = `Price: ${item?.Price}`;
        const Resold = document.createElement("div");
        Resold.textContent = `Resold: ${item?.Stats?.Resold}`;
        const Ads = document.createElement("div");
        Ads.textContent = `Ads: ${item?.Stats?.Ads}`;
        const TopAds = document.createElement("div");
        TopAds.textContent = `TopAds: ${item?.Stats?.TopAds}`;

        // Append image and other details to the popup content
        popupContent.appendChild(image);
        popupContent.appendChild(buildingName);
        popupContent.appendChild(Price);
        popupContent.appendChild(Resold);
        popupContent.appendChild(Ads);
        popupContent.appendChild(TopAds);
        popupContent.addEventListener("mouseenter", () => {
          popupContent.style.cursor = "pointer";
        });

        popupContent.addEventListener("mouseenter", () => {
          popupContent.classList.add("hovered");
        });

        const popup = new mapboxgl.Popup().setDOMContent(popupContent);
        popupContent.addEventListener("click", () => {
          openSidebar(item);
        });
        // for display a image in the card

        // const popup = new mapboxgl.Popup().setHTML(
        //   `<p>${item?.BuildingName}</p>`
        // );

        marker.setPopup(popup);

        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(map);
        });

        // marker.getElement().addEventListener("mouseleave", () => {
        //   popup.remove();
        // });
      });

    map.doubleClickZoom.disable();

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
      marker: true, // Disable adding a marker for the searched location
    });

    map.addControl(geocoder, "top-left");

    props.type === "admin" &&
      map.on("click", "3d-buildings", async (e) => {
        // Get information about the clicked building
        const buildingFeature = e.features[0];
        const buildingCoordinates = buildingFeature.geometry.coordinates;
        // Example: Find footpath location nearby
        const footpathCoordinates = [
          buildingCoordinates[0][0][0],
          buildingCoordinates[0][0][1] + 0.00001,
        ]; // Adjust coordinates as needed
        props.setNearCoord({
          longitude: Number(footpathCoordinates[0].toFixed(5)),
          latitude: Number(footpathCoordinates[1].toFixed(5)),
        });
        // Example: Add a marker at the footpath location
        const marker = new mapboxgl.Marker({ color: "red" })
          .setLngLat(footpathCoordinates)
          .addTo(map);
        // Create a popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
        }).setText("Marker for Ads!");

        // Associate the popup with the marker
        marker.setPopup(popup);

        // Add mouseover event listener to show the popup
        marker.getElement().addEventListener("mouseover", function () {
          marker.togglePopup();
        });

        // Add mouseout event listener to hide the popup
        marker.getElement().addEventListener("mouseout", function () {
          marker.togglePopup();
        });
        const coordinates = e.lngLat;
        if (coordinates) {
          fetchBuildingHeight(coordinates);
        }
        // getting building height
        const features = e.features;
        if (features.length > 0) {
          const firstFeature = features[0]; // Assuming only one building is clicked
          const buildingHeight = firstFeature.properties.height; // Get the height of the building
          props.setBuildingHeight(buildingHeight);
          // You can display the height in a popup or perform other actions
          // new mapboxgl.Popup()
          //   .setLngLat(coordinates)
          //   .setHTML(`<p>Building Height: ${buildingHeight} meters</p>`)
          //   .addTo(map);
        }
      });
    // fetching elevation data
    const fetchBuildingHeight = async (coordinates) => {
      const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coordinates.lng},${coordinates.lat}.json?limit=1&access_token=${mapboxgl.accessToken}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch elevation data");
        }
        const data = await response.json();
        const elevationResult = data.features[0].properties.ele;
        console.log("the elevation is", data.features[0].properties.ele);
        props.setSeaLevelHeight(elevationResult);
      } catch (error) {
        console.error("Error fetching elevation:", error);
        throw error;
      }
    };
    // fetching elevation data
   props.type === "admin" &&  map.on("mouseenter", "3d-buildings", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    props.type === "admin" && map.on("mouseleave", "3d-buildings", function () {
      map.getCanvas().style.cursor = "";
    });

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
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": {
            type: "identity",
            property: "height",
          },
          "fill-extrusion-base": {
            type: "identity",
            property: "min_height",
          },
          "fill-extrusion-opacity": 0.6,
        },
      });

      // // Add a mousemove event listener to the map
      // map.on("mouseover", "3d-buildings", (e) => {
      //   const buildingName = e.features[0].properties.name; // Get the building name from the features
      //   const popup = new mapboxgl.Popup()
      //     .setLngLat(e.lngLat)
      //     .setHTML(`<h3>${buildingName}</h3>`)
      //     .addTo(map);
      // });

      setMap(map);
      fetchPlacesAndAddMarkers(map);
    });
    props.type === "admin" && map.on("click", async (e) => {
      const coordinates = e.lngLat;
      console.log("the coordinates are", coordinates);
      // create a marker
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates.toArray())
        .addTo(map);
      // Create a popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setText("Marker for Builging!");

      // Associate the popup with the marker
      marker.setPopup(popup);

      // Add mouseover event listener to show the popup
      marker.getElement().addEventListener("mouseover", function () {
        marker.togglePopup();
      });

      // Add mouseout event listener to hide the popup
      marker.getElement().addEventListener("mouseout", function () {
        marker.togglePopup();
      });
      if (coordinates && props.type === "admin") {
        props?.setAdminCoordinates({
          longitude: Number(coordinates.lng.toFixed(5)),
          latitude: Number(coordinates.lat.toFixed(5)),
        });
      }
      let mapboxAccessToken = mapboxgl.accessToken;
      // Construct the URL for reverse geocoding
      const reverseGeocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxAccessToken}`;

      // Fetch data from the Mapbox Geocoding API
      fetch(reverseGeocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          // Extract building name or other relevant information from the response
          if (
            data.features &&
            data.features.length > 0 &&
            props.type === "admin"
          ) {
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
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?access_token=${mapboxgl.accessToken}&proximity=${center.lng},${center.lat}`
    );
    const data = await response.json();
    return data;
  };

  const addMarkersToMap = (features, type, map) => {
    features.forEach((feature) => {
      const color = type === "park" ? "green" : "red";
      let image = type === "park" ? park : junction; // Set image paths based on type

      // Create a new marker
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";
      markerElement.style.backgroundImage = `url(${image})`;
      markerElement.style.width = "30px"; // Set width of the marker
      markerElement.style.height = "30px"; // Set height of the marker

      // Add marker to the map
      new mapboxgl.Marker(markerElement)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({
            closeOnClick: false,
            maxWidth: "300px",
            width: "50px",
          }).setHTML(`<p >${color === "green" ? "Park" : "Junction"}</p>`)
        )
        .addTo(map);
    });
  };

  return (
    <div>
      <div id="map" className="map" />
      {sidebarInfo && (
        <div
          className="sidebar"
          style={{
            width: "300px",
            height: "100vh",
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            // overflow: "scroll",
          }}
        >
          <div className="text-end">
            <CloseSharpIcon
              style={{ cursor: "pointer" }}
              onClick={closeSidebar}
            />
          </div>
          <h3 className="text-center">Building Detail</h3>
          {sidebarInfo.Img_Url && (
            <img
              src={sidebarInfo.Img_Url[0]} // Replace with the appropriate property from sidebarInfo
              alt="Building Image"
              style={{
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }} // Adjust styles as needed
            />
          )}
          <h5>Name: {sidebarInfo.BuildingName}</h5>
          <p>Price: {sidebarInfo.Price}</p>
          <p>Resold: {sidebarInfo.Stats.Resold}</p>
          <p>Ads: {sidebarInfo.Stats.Ads}</p>
          <p>TopAds: {sidebarInfo.Stats.TopAds}</p>
          <div className="text-center">
            <Button variant="contained" onClick={()=> navigate(`/business/${sidebarInfo.Coordinates.longitude}/${sidebarInfo.Coordinates.latitude}/${sidebarInfo.SeaLevelHeight}`) }>
              Purchase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MapBox;
