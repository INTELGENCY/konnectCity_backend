import { Grid } from "@mui/material";
import React, { useState } from "react";
import MapBox from "../MapBox/MapBox";
import axios from "axios";
import { keys } from "../../api";

const AdminPanel = () => {
  const [admincoordinates, setAdminCoordinates] = useState({
    longitude: "",
    latitude: "",
  });
  const [data, setData] = useState({
    building_name: "",
    price: "",
  });
  const [NearCoord, setNearCoord] = useState({
    longitude: "",
    latitude: "",
  });
  const [BuildingHeight, setBuildingHeight] = useState("");
  const [SeaLevelHeight, setSeaLevelHeight] = useState("");
  const [File, setFile] = useState([]);
  const [AdsImage, setAdsImage] = useState("");
  const [draftloader, setDraftLoader] = useState(false);
  const [publishloader, setPublishLoader] = useState(false);
  const formData = new FormData();

  const handleDraft = async (status) => {
    status === "draft" ? setDraftLoader(true) : setPublishLoader(true);
        const formData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const requiredFields = [
      data.building_name,
      data.price,
      File.length,
      admincoordinates.latitude,
      admincoordinates.longitude,
    ];
    if (requiredFields.every((field) => field !== "")) {
      // File.forEach(file => formData.append("file", file));
      for (const file of File) {
        formData.append("file", file);
      }
      // formData.append("adsImage", AdsImage);
      formData.append("data", JSON.stringify(data));
      formData.append("status", JSON.stringify(status));
      formData.append("NearCoord", JSON.stringify(NearCoord));
      formData.append("SeaLevelHeight", JSON.stringify(SeaLevelHeight));
      formData.append("BuildingHeight", JSON.stringify(BuildingHeight));
      formData.append("Coordinates", JSON.stringify(admincoordinates));

      if (status) {
        const response = await axios.post(
          keys.api + "admin/function/draft",
          formData,
          config
        );
        if (response.status === 200) {
          setDraftLoader(false);
          setPublishLoader(false);
          setData({});
          setAdminCoordinates({});
          setFile([]);
        } else {
          setDraftLoader(false);
          setPublishLoader(false);
          setData({});
          setAdminCoordinates({});
          setFile([]);
        }
      }
    }
  };

  // upload image function

  const handleFileChange = async (e) => {
    setFile(e.target.files);
  };
  const handleAdsImage = async (e) => {
    setAdsImage(e.target.files[0]);
  };

  return (
    <div className="h-100 w-100">
      <div className="row m-0 ">
        <div className="col col-9">
          <MapBox
            setAdminCoordinates={setAdminCoordinates}
            setSeaLevelHeight={setSeaLevelHeight}
            setBuildingHeight={setBuildingHeight}
            setNearCoord={setNearCoord}
            admincoordinates={admincoordinates}
            setData={setData}
            data={data}
            type="admin"
          />
        </div>
        <div
          className="col col-3"
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
        >
          <div className="row me-1">
            <div className="col-12 card mt-4 py-4">
              <div className="mb-3 text-center">
                <h3>Details</h3>
              </div>
              {/* {admincoordinates.latitude !== "" && admincoordinates.longitude !== "" && (
                <div className="">
                  <div>{`Longitude: ${admincoordinates.longitude}`}</div>
                  <div>{`Latitude: ${admincoordinates.latitude}`}</div>
                </div>
              )} */}
              <div className="mb-3">
                <label className="form">Building Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Building Name"
                  value={data?.building_name ? data.building_name : ""}
                  onChange={(e) => {
                    setData({ ...data, building_name: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Price"
                  value={data?.price ? data.price : ""}
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form">Add Building Image:</label>
                <input
                  multiple
                  name="file"
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              {/* <div className="mb-3">
                <label className="form">Add Ads Image:</label>
                <input
                  // multiple
                  name="ads_img"
                  type="file"
                  className="form-control"
                  onChange={handleAdsImage}
                />
              </div> */}
              <div className="d-flex justify-content-center gap-3">
                <button
                  style={{ minWidth: "70px" }}
                  type="button"
                  onClick={() => handleDraft("draft")}
                  className="btn btn-primary"
                >
                  {draftloader ? (
                    <div
                      className="spinner-border text-light"
                      style={{ width: "20px", height: "20px" }}
                      role="status"
                    ></div>
                  ) : (
                    "Drafts"
                  )}
                </button>
                <button
                  style={{ minWidth: "70px" }}
                  type="button"
                  onClick={() => handleDraft("published")}
                  className="btn btn-primary"
                >
                  {publishloader ? (
                    <div
                      className="spinner-border text-light"
                      style={{ width: "20px", height: "20px" }}
                      role="status"
                    ></div>
                  ) : (
                    "Published"
                  )}
                </button>
              </div>
            </div>
            <div className="col-12 card mt-4 py-2 mb-2">
              <div className="">
                <h3 className="text-center">Stats</h3>
                <div className="">
                  <div className="card-body">
                    <h6 className="">
                      Resold:<span className="ms-2">1</span>
                    </h6>
                    <h6 className="">
                      Ads:<span className="ms-2">1</span>
                    </h6>
                    <h6 className="">
                      Top Ads:<span className="ms-2">1</span>
                    </h6>
                    <h6 className="">
                      Daily Impressions:<span className="ms-2">1</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
