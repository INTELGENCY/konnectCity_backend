import express from "express";
import publicFunctions from "../controllers/cloudfunctions/public/cloudfunctions";
import adminFunctions from "../controllers/cloudfunctions/admin/cloudfunctions";
import businessFunctions from "../controllers/cloudfunctions/business/cloudfunctions";

export default (router: express.Router) => {
  // for admin routes
  router.post("/api/admin/function/:cloudFunctionName", adminFunctions);
  // for public routes
  router.get("/api/public/function/:cloudFunctionName", publicFunctions);
  // for Business routes
  router.post("/api/business/function/:cloudFunctionName", businessFunctions);
  router.get("/api/business/function/:cloudFunctionName", businessFunctions);
  // for testing
  router.post("/api/test", function (req: Express.Request, res) {
    console.log("test api");
    return res.json({ test: "ok" }).status(200);
  });
};
