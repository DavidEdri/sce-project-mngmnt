import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import Loading from "../../common/Loading";
import FacilityContainer from "./FacilityContainer";

export default function Facility({ match: { params } }) {
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState({});
  const { id } = params;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Axios(`/guests/facility/${id}`);
        setFacility(res.data);
      } catch (error) {
        setFacility(null);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <Loading />;
  if (!facility) return <div>Invalid facility id</div>;

  return <FacilityContainer facility={facility} />;
}

Facility.propTypes = {
  match: PropTypes.object.isRequired,
};
