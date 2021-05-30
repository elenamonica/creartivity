import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_SIGN_OUT } from "../constants/userConstants";

export default function ProfileScreen() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-container profile-form">
          <li>
            <h1>User Profile</h1>{" "}
          </li>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger"> {error}</MessageBox>
          ) : (
            <>
              <li>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={user.name}
                  ></input>
                </div>
              </li>
              <li>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    value={user.email}
                  ></input>
                </div>
              </li>
              <li>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter email"
                    value={user.password}
                  ></input>
                </div>
              </li>
              <li>
                <div>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    id="confirmpassword"
                    type="password"
                    placeholder="Confirm password"
                  ></input>
                </div>
              </li>
              <li>
                <div>
                  <label></label>
                  <button className="button primary full-width" type="submit">
                    Update
                  </button>
                </div>
              </li>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
