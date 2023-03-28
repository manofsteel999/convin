import {
    FETCH_BUCKETS_SUCCESS,
    FETCH_BUCKETS_FAILURE,
    ADD_BUCKET_SUCCESS,
    ADD_BUCKET_FAILURE,
    EDIT_BUCKET_SUCCESS,
    EDIT_BUCKET_FAILURE,
    DELETE_BUCKET_SUCCESS,
    DELETE_BUCKET_FAILURE,
  } from '../actionTypes';
  import axios from 'axios';
  
  // Action creators for Buckets
  export const fetchBucketsSuccess = (buckets) => {
    return {
      type: FETCH_BUCKETS_SUCCESS,
      payload: buckets,
    };
  };
  
  export const fetchBucketsFailure = (error) => {
    return {
      type: FETCH_BUCKETS_FAILURE,
      payload: error,
    };
  };
  
  export const addBucketSuccess = (bucket) => {
    return {
      type: ADD_BUCKET_SUCCESS,
      payload: bucket,
    };
  };
  
  export const addBucketFailure = (error) => {
    return {
      type: ADD_BUCKET_FAILURE,
      payload: error,
    };
  };
  
  export const editBucketSuccess = (bucket) => {
    return {
      type: EDIT_BUCKET_SUCCESS,
      payload: bucket,
    };
  };
  
  export const editBucketFailure = (error) => {
    return {
      type: EDIT_BUCKET_FAILURE,
      payload: error,
    };
  };
  
  export const deleteBucketSuccess = (bucketId) => {
    return {
      type: DELETE_BUCKET_SUCCESS,
      payload: bucketId,
    };
  };
  
  export const deleteBucketFailure = (error) => {
    return {
      type: DELETE_BUCKET_FAILURE,
      payload: error,
    };
  };
  
  // Async action creators for Buckets
  export const fetchBuckets = () => {
    return (dispatch) => {
      axios.get('https://convin-test-api.onrender.com/buckets')
        .then((response) => {
          dispatch(fetchBucketsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchBucketsFailure(error.message));
        });
    };
  };
  
  export const addBucket = (name) => {
    return (dispatch) => {
      axios.post('https://convin-test-api.onrender.com/buckets', { name: name })
        .then((response) => {
          dispatch(addBucketSuccess(response.data));
        })
        .catch((error) => {
          dispatch(addBucketFailure(error.message));
        });
    };
  };
  
  export const editBucket = ({id, name}) => {
    return (dispatch) => {
      axios.patch(`https://convin-test-api.onrender.com/buckets/${id}`, { name })
        .then((response) => {
          dispatch(editBucketSuccess(response.data));
        })
        .catch((error) => {
          dispatch(editBucketFailure(error.message));
        });
    };
  };
  
  export const deleteBucket = (id) => {
    return (dispatch) => {
      axios.delete(`https://convin-test-api.onrender.com/buckets/${id}`)
        .then((response) => {
          dispatch(deleteBucketSuccess(id));
        })
        .catch((error) => {
          dispatch(deleteBucketFailure(error.message));
        });
    };
  };
  