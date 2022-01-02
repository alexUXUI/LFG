import * as React from "react";
import { motion } from "framer-motion";

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
  const Elements = [
    <h1>Welcome to the Audio Visualizer!</h1>,
    <h2>Your audio data generates 3D graphics</h2>,
    <h3>About</h3>,
    <p>To get started CLick Play</p>,
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
