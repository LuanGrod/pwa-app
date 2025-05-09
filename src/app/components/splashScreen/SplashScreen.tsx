"use client";

import * as motion from "motion/react-client";
import styles from "./SplashScreen.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";

type Props = {};

export default function SplashScreen({}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const router = useRouter();

  const handleEndAnimation = () => {
    setIsVisible(false);
    document.cookie = "splash_shown=true; path=/; max-age=300";
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isVisible && (
          <div className={styles.content}>
            <motion.img
              src="/project/assets/Logo.svg"
              width={165}
              height={165}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {
                  opacity: 1,
                },
                visible: {
                  opacity: 1,
                  transition: { type: "tween", duration: 1.7 },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    delay: 0.1,
                  },
                },
              }}
            />
            <motion.div
              className={styles.textContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 0.1,
                },
              }}
              onAnimationComplete={() => handleEndAnimation()}
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
                        delay: 0.3 + index * 0.13,
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
