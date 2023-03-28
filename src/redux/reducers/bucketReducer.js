import { ADD_BUCKET_SUCCESS, DELETE_BUCKET_SUCCESS, EDIT_BUCKET_SUCCESS, FETCH_BUCKETS_SUCCESS } from "../actionTypes";

const initialState = {
  buckets: [],
};

const bucketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: [...state.buckets, action.payload],
      };
    case DELETE_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: state.buckets.filter((bucket) => bucket.id !== action.payload),
      };
    case EDIT_BUCKET_SUCCESS:
      const updatedBuckets = state.buckets.map((bucket) =>
        bucket.id === action.payload.id ? { ...bucket, name: action.payload.name } : bucket
      );
      return {
        ...state,
        buckets: updatedBuckets,
      };
    case FETCH_BUCKETS_SUCCESS:
      return {
        ...state,
        buckets: action.payload,
      };
    default:
      return state;
  }
};

export default bucketReducer;
