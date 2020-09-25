import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
} from "react-spring";
import { Avatar, Row, Button, Divider } from "antd";
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
    to: {
      size: open ? "900px" : "200px",
      background: open ? "rgba(250,250,250,.65)" : "red",
    },
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
    position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
  grid-gap: "25px",
  padding: "25px",
  background: "white",
  borderRadius: "5px",
  cursor: "pointer",
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05),
  willChange: "width, height",
  */

  return (
    <>
      <animated.div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
          gridGap: "25px",
          padding: "25px",
          margin: "10px",
          background: "white",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.05)",
          willChange: "width, height",
          textAlign: "center",
          ...rest,
        }}
        onClick={() => set((open) => !open)}
      >
        <p style={{ alignSelf: "center" }}>{plan.title}</p>

        {transitions.map(({ item, props, key }, index) => {
          if (!open) {
            return null;
          }

          return (
            <>
              <animated.div
                key={item._id + index}
                style={{
                  ...props,
                  padding: "10px",
                  marginLeft: "20px",
                  height: "200px",
                  width: "200px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(253, 160, 133) 100%)",
                }}
              >
                <row style={{display: "block"}}>
                  
                  <Avatar src={item.icon} />
                </row>
                <p
                  style={{
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "180px",
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  {item.name}
                </p>
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
