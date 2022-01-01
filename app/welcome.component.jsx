import * as React from "react";
import { motion } from "framer-motion";

export const Welcome = () => {
  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <>
          <h1>Welcome to the Audio Visualizer! 🔥</h1>
          <h2>Where your audio data generates 3D graphics</h2>
          <h3>About</h3>
          <p>To get started CLick Play</p>
        </>
      </motion.div>
    </div>
  );
};
