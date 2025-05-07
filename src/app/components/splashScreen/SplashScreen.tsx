import * as motion from "motion/react-client";
import styles from "./SplashScreen.module.css";
import { useState } from "react";

type Props = {};

export default function SplashScreen({}: Props) {
  const [showText, setShowText] = useState(false);

  return (
    <div className={`aaaa ${styles.container}`}>
      <motion.img
        src="/assets/Logo.svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 2 }}
        onAnimationComplete={() => setShowText(true)}
      />

      <div className={styles.textContainer}>
        {showText && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            style={{ display: "flex" }}
          >
            {"MedRQE".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      type: "spring",
                      delay: index * 0.1,
                    },
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
