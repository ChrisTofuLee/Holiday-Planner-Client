import React, { useContext, useEffect, useState, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
import { Global, Container, Item } from "./planStyles";

const PlanBox = () => {

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
  const transitions = useTransition(open ? savedPlans[1].places : [], (place) => place.name,{
    trail: 400 / savedPlans.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  });


  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);

  const testClick = (item, index) => {
    console.log("hihihihih", item, "i", index);}
    return (<Container
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
            <p style={{textAlign: "center"}}>{item.name}</p>
          </Item>
        ))}
      </Container>)
}

export default PlanBox