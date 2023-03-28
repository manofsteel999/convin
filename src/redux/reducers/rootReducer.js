import { combineReducers } from "redux";
import bucketReducer from "./bucketReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  bucket: bucketReducer,
  card: cardReducer,
});

export default rootReducer;
