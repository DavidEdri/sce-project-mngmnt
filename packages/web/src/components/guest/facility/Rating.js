import React, { useState } from "react";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import Axios from "axios";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function MyRating({ rating: ratingProp, facilityID }) {
  const [rating, setRating] = useState(ratingProp);
  const auth = useSelector((state) => state.auth);
  const canRate = auth.isLoggedin && !rating.ratedBy.includes(auth.user.id);
  const isUnrated = rating.ratedBy.length === 0;
  const rate = isUnrated ? 0 : rating.totalRate / rating.ratedBy.length;

  const onRate = async (e) => {
    try {
      const rate = e.target.value;

      const res = await Axios.post("/users/facility/rate", {
        facilityID,
        rate,
      });
      setRating(res.data.rating);
    } catch (error) {}
  };

  return (
    <Box my={2} display="flex" flexDirection="column" alignItems="center">
      <Typography component="legend">
        {isUnrated ? "Unrated facility" : <div>{`Rating: ${rate}`}</div>}
      </Typography>
      <Rating
        onChange={onRate}
        name="customized-icons"
        defaultValue={rate}
        getLabelText={(value) => customIcons[value].label}
        disabled={!canRate}
        IconContainerComponent={IconContainer}
      />
    </Box>
  );
}

MyRating.propTypes = {
  rating: PropTypes.object.isRequired,
  facilityID: PropTypes.string.isRequired,
};
