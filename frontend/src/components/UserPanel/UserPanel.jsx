import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MapBox from "../MapBox/MapBox";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { keys } from "../../api";

const UserPanel = () => {
  const [showData, setShowData] = useState([]);
  const [type, setType] = useState("");
  const [display, setDisplay] = useState(false);
  const [coordinates, setCoordinates] = useState({
    longitude: "",
    latitude: "",
  });
  const [displayName, setDisplayName] = useState("");
  const getAll = async () => {
    try {
      let result = await axios.get(keys.api + "public/function/getAll");
      if (result?.data?.length > 0) {
        setShowData(result?.data);
        setDisplay(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="h-100 w-100">
      <div className="row m-0 ">
        <div className="col col-9">
          {display && (
            <MapBox
              coordinates={coordinates}
              type={type}
              setType={setType}
              displayName={displayName}
              showData={showData}
            />
          )}
        </div>
        <div
          className="col col-3"
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
        >
          <div className="row">
            {showData?.map((item, index) => (
              <div className="col-12 mt-4" key={index}>
                <div className="card">
                  <img
                    src={item?.Img_Url[0]}
                    className="card-img-top me-0 pe-0"
                    alt="..."
                    style={{maxHeight:200}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name: {item.BuildingName}</h5>
                    <p className="mb-0">Price: {item?.Price}</p>
                    <p className="mb-0">Resold: {item?.Stats?.Resold}</p>
                    <p className="mb-0">Ads: {item?.Stats?.Ads}</p>
                    <p className="mb-0">TopAds: {item?.Stats?.TopAds}</p>
                    <p className="">
                      DailyImpression: {item?.Stats?.DailyImpression}
                    </p>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCoordinates({
                            longitude: item?.Coordinates?.longitude,
                            latitude: item?.Coordinates?.latitude,
                          }),
                            setType("user"),
                            setDisplayName(item.BuildingName);
                        }}
                        className="btn btn-primary"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
