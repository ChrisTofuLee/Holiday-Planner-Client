import React, { useState, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
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

  return (
    <Container
      style={{ ...rest, width: size, height: size, margin: "0 auto" }}
      onClick={() => set((open) => !open)}
    >
      <p>{plan.title}</p>
      {transitions.map(({ item, props, key }, index) => {
        if (!open) {
          return null;
        }
        console.log(item)
        return (
          <Item
            key={item._id + index}
            style={{
              ...props,

              width: "100%",
              height: "80%",
              background:
                "linear-gradient(135deg, rgb(255,77,79) 0%, rgb(253, 160, 133) 100%)",
            }}
          >
            <p style={{ textAlign: "center" }}>{item.name}</p>
          </Item>
        );
      })}
    </Container>
  );
};

export default PlanBox;
