import express from 'express'
import cloudfunctions from './cloudfunctions';

const router = express.Router();
export default (): express.Router=>{
    cloudfunctions(router)
    return router
}