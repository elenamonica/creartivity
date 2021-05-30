import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGN_OUT,
} from "../constants/userConstants";

const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export const signout = () => (dispatch) => {
  Cookie.remove('userInfo');
  Cookie.remove('cartItems');
  Cookie.remove('shippingAddress');
  dispatch({ type: USER_SIGN_OUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({type:USER_DETAILS_REQUEST, payload: userId});
  const {userSignIn: {userInfo}} =  getState();
  try {
    const {data} = await Axios.get(`/api/users/${userInfo}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: USER_DETAILS_FAIL, payload: message})
  }
}

export { register, signIn };
