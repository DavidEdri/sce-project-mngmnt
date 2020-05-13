import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Axios from "axios";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../../redux/actions/authActions";

const Favorite = ({ facilityID }) => {
  const dispatch = useDispatch();
  const add = async () => {
    try {
      await Axios.put("/users/facility/favorite", { facilityID });
      dispatch(addToFavorite(facilityID));
    } catch (error) {}
  };

  const remove = async () => {
    try {
      await Axios.delete(`/users/facility/favorite/${facilityID}`);
      dispatch(removeFromFavorite(facilityID));
    } catch (error) {}
  };

  const { user, isLoggedin } = useSelector((state) => state.auth);
  if (!isLoggedin) return <></>;
  if (user.favorites.includes(facilityID))
    return <div onClick={remove}>Remove from favorites</div>;

  return <div onClick={add}>add to favorites</div>;
};

Favorite.propTypes = {
  facilityID: PropTypes.string.isRequired,
};

export default Favorite;
