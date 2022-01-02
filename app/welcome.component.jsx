import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-location";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Welcome = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate({ to: "./audio-viz", replace: true });
  };

  const Elements = [
    <h1>Welcome to the Audio Visualizer!</h1>,
    <h2>Your audio data generates 3D graphics</h2>,
    <h3>About</h3>,
    <p>To get started Click Play</p>,
    <button onClick={onClick}>Go to Audio Viz</button>,
  ];

  return (
    <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Elements.map((index) => (
        <motion.div
          key={Math.random() * 100 + Math.random()}
          className="item"
          variants={item}
        >
          {index}
        </motion.div>
      ))}
    </motion.div>
  );
};
