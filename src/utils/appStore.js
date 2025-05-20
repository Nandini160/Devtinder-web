import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './userSlice';
import feedReducer  from "./feedSlice";
import connectionReduce from "./conectionSlice"
import requestReducer from "./requestSlice"

 const appStore = configureStore({
  reducer: {
    user : userReducer,
    feed : feedReducer, 
    connections : connectionReduce,
    requests: requestReducer,
  },
})

export default appStore;