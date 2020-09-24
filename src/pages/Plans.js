import React, { useContext, useEffect, useState } from "react";
import { Global } from "./planStyles";
import PlanBox from "../components/PlanBox";
import axios from "axios";
import UserContext from "../context/UserContext";
import mountain from "../assets/mountains.jpg";

const API_URL = process.env.API_URL || "http://localhost:8001";

const Plans = () => {
  const { user } = useContext(UserContext);
  const [savedPlans, setSavedPlans] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await axios.get(`${API_URL}/api/plans`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSavedPlans(data.allPlans);
    };
    fetchPlans();
  }, [setSavedPlans, user.token]);

  return (
    <div
      style={{
        minHeight: "93.5vh",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${mountain})`,
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // height: "500px",
      }}
    >
      <Global />
      {savedPlans.length &&
        savedPlans.map((plan) => <PlanBox key={plan._id} plan={plan} />)}
    </div>
  );
};
export default Plans;
