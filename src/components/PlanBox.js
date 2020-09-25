import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
} from "react-spring";
import { Avatar, Row, Button } from "antd";
import { Container, Item } from "../pages/planStyles";

const PlanBox = ({ plan }) => {
  console.log("here", plan);
  const [open, set] = useState(false);
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
    open ? plan.places : [],
    (place) => {
      return place._id;
    },
    {
      trail: 400 / plan.places.length,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" },
    }
  );

  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);

  /*
    position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: 25px;
  padding: 25px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
  */

  return (
    <>
      <animated.div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginRight: "20px",
          marginBottom: "20px",
          width: size,
          height: size,
          background: "white",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.05)",
          ...rest,
        }}
        onClick={() => set((open) => !open)}
      >
        <Row style={{width: "100%", textAlign: "center"}}><p>{plan.title}</p>
        </Row>
        {transitions.map(({ item, props, key }, index) => {
          if (!open) {
            return null;
          }
          console.log(item);

          return (
            <>
              <animated.div
                key={item._id + index}
                style={{
                  ...props,
                  padding: "10px",
                  marginRight: "20px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(253, 160, 133) 100%)",
                }}
              >
                <Row><Avatar src={item.icon} style={{ display: "inline-block" }} />
                <p style={{ textAlign: "center", overflow: "auto" }}>{item.name}</p></Row>
                <img
                  style={{ height: "100px", width: "150px" }}
                  alt={`${item.name} image`}
                  src={item.photo}
                />
              </animated.div>
            </>
          );
        })}
      </animated.div>
    </>
  );
};

export default PlanBox;
