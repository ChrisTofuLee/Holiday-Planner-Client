import React, { useContext, useEffect, useState, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
import { Global, Container, Item } from "./planStyles";
import testData from "./testData";
import axios from "axios";
import UserContext from "../context/UserContext";
import mountain from "../assets/mountains.jpg";

const API_URL = process.env.API_URL || "http://localhost:8001";

const Plans = () => {
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
  const transitions = useTransition((savedPlans) => savedPlans.title,{
    
    ref: transRef,
    unique: true,
  });
  // {
  //   name: 'Rare Wind',
  //   description: '#a8edea → #fed6e3',
  //   css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  //   height: 200
  // },
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
      <Global />
      <Container
        style={{ ...rest, width: size, height: size, margin: "0 auto" }}
        onClick={() => set((open) => !open)}
      >
        {transitions.map(({ item, key, props }) => (
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
            <p>{savedPlans.item}</p>
          </Item>
        ))}
      </Container>
    </div>
  );
};
// background: linear-gradient(135deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)
export default Plans;
