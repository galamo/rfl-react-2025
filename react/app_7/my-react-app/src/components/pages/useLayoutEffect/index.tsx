//@ts-nocheck
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function UseLayoutEffectVsUseEffect() {
  return (
    <div>
      <WithUseEffect />
      <WithUseLayoutEffect />
    </div>
  );
}

function WithUseEffect() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const rect = boxRef?.current?.getBoundingClientRect();
    setTimeout(() => {
      setHeight(250 || 0);
    }, 100);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        background: "lightblue",
        transition: "all 0.2s",
        height: height || "auto",
      }}
    >
      This box has dynamic height.
    </div>
  );
}

function WithUseLayoutEffect() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // no flicker
    const rect = boxRef?.current.getBoundingClientRect();
    setHeight(250 || 0);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        background: "lightgreen",
        transition: "all 0.2s",
        height: height || "auto",
      }}
    >
      This box has dynamic height.
    </div>
  );
}
