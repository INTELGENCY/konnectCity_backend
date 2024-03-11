import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { keys } from "../../../api";

function CreateAds(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(
    Object.keys(props?.data).length !== 0 ? props.data.AdsUrl : ""
  );
  const [adsDetail, setAdsDetail] = useState(
    Object.keys(props?.data).length !== 0 ? props?.data?.AdsDetail : ""
  );
  const [price, setPrice] = useState("");
  const [link, setLink] = useState(Object.keys(props?.data).length !== 0 ? props?.data?.Link : "");
  const [showScroll, setShowScroll] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    // Access the selected file from event.target.files
    const file = event.target.files[0];
    // Update the state with the selected file
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    setShowScroll(true);
  };
  const handleSubmit = async () => {
    // Handle form submission logic here
    setLoader(true);
    const formData = new FormData();
    let data = {
      AdsDetail: adsDetail,
      // Price: 1234,
      Link: link,
      Coordinates: {
        longitude: props?.lng,
        latitude: props?.lat,
      },
      SeaLevel_Height: props?.height,
    };
   if(Object.keys(props?.data).length !== 0){
    data._id = props.data._id
    props.setRender(true)
   }
    formData.append("data", JSON.stringify(data));
    formData.append("file", selectedFile);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let url;
      if (Object.keys(props?.data).length !== 0) {
        url = keys.api + "business/function/updateAd" ;
      } else {
        url = keys.api + "business/function/createAds";
      }
      const response = await axios.post(
        url,
        formData,
        config
      );
      if (response.status === 200) {
        props.setPublishedAdId(response?.data?._id);
        setPreviewURL("");
        setSelectedFile(null);
        setAdsDetail("");
        setPrice("");
        setLink("");
        setShowScroll(false);
        setLoader(false);
        Object.keys(props?.data).length !== 0 && props?.setData({})
      }
    } catch (error) {
      console.log("the error is", error);
      setLoader(false);
    }
  };
  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        borderRadius: 10,
        marginTop: 20,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
      variant="outlined"
    >
      <div style={{ marginTop: 10 }}>
        <h3>Upload Ads</h3>
      </div>
      <div>
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
        )}
      </div>
      <div
        style={{
          maxHeight: showScroll ? 200 : 350,
          overflowY: showScroll ? "scroll" : "hidden",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingInline: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <TextField
            style={{ width: "100%" }}
            id="outlined-multiline-static"
            label="Ads Detail"
            multiline
            rows={3}
            placeholder="Detail...."
            value={adsDetail}
            onChange={(e) => setAdsDetail(e.target.value)}
          />
          {/* <TextField
            className="mt-2 w-100"
            id="outlined-price"
            label="Price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
          /> */}
          <TextField
            className="mt-2 w-100"
            id="outlined-link"
            label="Link"
            placeholder="Enter link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            variant="outlined"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input
            accept=".jpg, .jpeg, .png, .pdf"
            style={{ display: "none" }}
            id="file-input"
            type="file"
            name="file"
            onChange={handleChange}
          />
          <label
            htmlFor="file-input"
            style={{ marginRight: 10, marginTop: 10 }}
          >
            <Button variant="contained" color="primary" component="span">
              Choose File
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={props?.data ? false : !selectedFile || !adsDetail}
          >
            {loader ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" size={26} />
              </Box>
            ) : Object.keys(props?.data).length !== 0  ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CreateAds;
