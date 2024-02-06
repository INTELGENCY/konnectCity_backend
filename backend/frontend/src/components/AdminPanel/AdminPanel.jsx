import { Grid } from "@mui/material";
import React, { useState } from "react";
import MapBox from "../MapBox/MapBox";
import axios from "axios";

const AdminPanel = () => {
  const [admincoordinates, setAdminCoordinates] = useState({
    longitude: "",
    latitude: "",
  });
  const [data, setData] = useState({
    building_name: "",
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [File, setFile] = useState([]);
  const formData = new FormData();
  // console.log("The URL is", import.meta.env.VITE_REACT_APP_URL);

  // Draft and Published Button function
  const handleDraft = async(status) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (data.building_name !== "" && data.price !== "" && File.length > 0 && admincoordinates.latitude!=='' && admincoordinates.longitude!=='') {
      for (const file of File) {
        formData.append("file", file);
      }
      let Status=status
      formData.append("data", JSON.stringify(data));
      formData.append("status",JSON.stringify(status));
      formData.append("Coordinates",JSON.stringify(admincoordinates))
      console.log("the data  is", formData.get("data"));
      if (status === "draft") {
        let response = await axios.post(
          "http://localhost:8080/api/admin/function/draft",
          formData,
          config
        );
      }
    }
  };

  // upload image function

  const handleFileChange = async (e) => {
    setFile(e.target.files);
    // formData.append('file', file);
    // formData.append('upload_preset', 'khcf0m6a');

    // Make a POST request to Cloudinary's upload API
    // try {
    //   const response = await fetch('https://api.cloudinary.com/v1_1/maliknaseer/image/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setImageUrl(data.secure_url);
    //   } else {
    //     console.error('Failed to upload image');
    //   }
    // } catch (error) {
    //   console.error('Error uploading image', error);
    // }
  };
  // console.log("after click the coordinates is",coordinates)

  return (
    <div className="h-100 w-100">
      <div className="row m-0 ">
        <div className="col col-9">
          <MapBox setAdminCoordinates={setAdminCoordinates} admincoordinates={admincoordinates} setData={setData} data={data} type="admin" />
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
                  value={data?.building_name?data.building_name:""}
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
                  value={data?.price?data.price:""}
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                {/* <label className="form">Building Name:</label> */}
                <input
                  multiple
                  name="file"
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDraft("draft")}
                  className="btn btn-primary"
                >
                  Drafts
                </button>
                <button
                  type="button"
                  onClick={() => handleDraft("published")}
                  className="btn btn-primary"
                >
                  Published
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
