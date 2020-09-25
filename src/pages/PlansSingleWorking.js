import React, { useContext, useEffect, useState, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
import { Container, Item } from "./planStyles";
import PlanBox from "../components/PlanBox";
import testData from "./testData";
import axios from "axios";
import UserContext from "../context/UserContext";
import mountain from "../assets/mountains.jpg";

const API_URL = process.env.API_URL || "http://localhost:8001";

const PlansSingleWorking = () => {
  const { user } = useContext(UserContext);
  const [savedPlans, setSavedPlans] = useState("");
  const [open, set] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await axios.get(`${API_URL}/api/plans`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSavedPlans(data.allPlans);
      console.log("plan fetched");
    };
    fetchPlans();
  }, [setSavedPlans, user.token]);
  console.log(savedPlans);
  // Build a spring and catch its ref
  const springRef = useRef();
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: "160px", background: "red" },
    to: { size: open ? "850px" : "150px", background: open ? "white" : "red" },
  });
  // Build a transition and catch its ref
  const transRef = useRef();
  const transitions = useTransition(
    open ? savedPlans[1].places : [],
    (place) => place.name,
    {
      trail: 400 / savedPlans.length,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" },
    }
  );

  // First run the spring, when it concludes run the transition
  // useChain([springRef, transitionRef]);
  // Use the animated props like always

  // The spring will start right away: 0.0 * 1000ms = 0ms
  // The transition will start after: 0.5 * 1000ms (the timeFrame default) = 500ms
  // useChain([springRef, transitionRef], [0, 0.5] /*1000*/);
  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);

  const testClick = (item, index) => {
    console.log("hihihihih", item, "i", index);
  };
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
        height: "500px",
      }}
    >
      <Container
        style={{ ...rest, width: size, height: size, margin: "0 auto" }}
        onClick={() => set((open) => !open)}
      >
        <p>title</p>
        {transitions.map(({ item, props, key }) => (
          <Item
            key={key}
            style={{
              ...props,

              width: "100%",
              height: "80%",
              background:
                "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(253, 160, 133) 100%)",
            }}
            onClick={testClick(item, key)}
          >
            <p style={{ textAlign: "center" }}>{item.name}</p>
          </Item>
        ))}
      </Container>
    </div>
  );
};
// background: linear-gradient(135deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)
export default PlansSingleWorking;
