// import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import { Box, Icon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import lang_img from "../../assets/land.jpg";
import lang_img from "../../assets/img_1.jpg";
import CreateAds from "./CreateAds/CreateAds";
import { useParams } from "react-router-dom";
import axios from "axios";
import { keys } from "../../api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function BusinessPanel() {
  const [show, setShow] = useState("");
  const [data, setData] = useState({});
  const [hide, setHide] = useState(true);
  const { lng, lat, height } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [publishedAdId, setPublishedAdId] = useState(
    "65e70f346dfabb340a018ed7"
  );
  const [render,setRender]=useState(false)

  console.log("the published id is", publishedAdId);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (type) => {
    setShow(type);
  };
  useEffect(() => {
    getAd();
  }, [publishedAdId,render]);
  const getAd = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (publishedAdId) {
        const response = await axios.post(
          keys.api + "business/function/getAdById",
          { _id: publishedAdId },config
        );

        if (response.data) {
          setRender(false)
          setHide(false);
          setData(response.data);
        } else {
          return;
        }

        // return response.data;
      } else {
        console.log("No ad ID provided");
        return null;
      }
    } catch (error) {
      console.error("Error while fetching ad:", error);
      throw error;
    }
  };
  const deleteAd = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        keys.api + `business/function/deleteAd/${id}`,config
      );
      console.log(response); // Log success message
      if (response.status === 200) {
        setAnchorEl(null);
        setShow("");
        setData({});
        setHide(true);
      }
    } catch (error) {
      console.error("Error while deleting ad:", error);
      throw error;
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#5a6373",
        
      }}
    >
      <Container maxWidth="md" >
        <Card variant="outlined" style={{ position: "relative",borderRadius: "20px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Post Ads
            </Typography>
            <Stack
              spacing={6}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => handleClick("Published")}
                disabled={hide}
              >
                Published
              </Button>
              <Button
                variant="contained"
                onClick={() => handleClick("Previous")}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                disabled={!lng || !lat || !height}
                onClick={() => handleClick("Add")}
              >
                Create
              </Button>
            </Stack>
            {/* ads card */}
            {(show === "Published" || show === "Previous") && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Card
                  sx={{
                    // maxWidth: 345,
                    width: 345,
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "20px",
                  }}
                >
                  <CardHeader
                    //   avatar={
                    //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //       R
                    //     </Avatar>
                    //   }
                    action={
                      show === "Published" && (
                        <IconButton
                          aria-label="settings"
                          onClick={handleMenuClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )
                    }
                    title={
                      show === "Published" ? "Abdul Rehman" : "Malik Naseer"
                    }
                    subheader={
                      show === "Published" ? "10 minutes ago" : "23 hours ago"
                    }
                  />
                  {show === "Published" && (
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        style: {
                          // maxHeight: 200,
                          minWidth: 150,
                          // marginTop: 40, // Adjust this value according to your needs
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={()=>{setShow("Add"),setAnchorEl(null)}}>Update</MenuItem>
                      <MenuItem onClick={() => deleteAd(data?._id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  )}
                  <CardMedia
                    component="img"
                    height="194"
                    image={(data && show==="Published") ? data?.AdsUrl : lang_img}
                    alt="Ads Image"
                  />
                  <CardContent>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        {show === "Published" ? "Land#2" : "Land#1"}
                      </Typography>
                      {/* <Typography>Price: {show===
                        "Published" ? "897" : "145"}</Typography> */}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {(data && show==="Published")
                        ? data?.AdsDetail
                        : "These include floor plans, elevations, sections, and details that illustrate the layout and design of the building."}
                    </Typography>
                  </CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Button variant="contained">View</Button>
                  </Box>
                </Card>
              </Box>
            )}
            {show === "Add" && (
              <CreateAds
                lng={lng}
                lat={lat}
                height={height}
                setPublishedAdId={setPublishedAdId}
                data={data}
                setData={setData}
                setRender={setRender}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default BusinessPanel;
