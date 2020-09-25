import React, { useContext, useEffect, useState } from "react";
import { Divider } from "antd";
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
        backgroundImage: `url(${mountain})`,
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container" style={{paddingTop: "50px"}}>
        <div
          style={{
            borderRadius: "25px",
            padding: "25px",
           
          }}
        >
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ fontSize: "30px", color: "white", fontWeight: "bold" }}>
                  Plans
                </th>
              </tr>
            </thead>
            <Divider
              style={{ borderColor: "white", backgroundColor: "white" }}
            />
            <tbody>
              <tr>
                <th scope="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginRight: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {savedPlans.length &&
                      savedPlans.map((plan) => (
                        <PlanBox key={plan._id} plan={plan} />
                      ))}
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Plans;
