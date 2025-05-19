"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import styles from "./SplashScreen.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { onEnd?: () => void };

export default function SplashScreen({ onEnd }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleEndAnimation = () => {
    setIsVisible(false);
    document.cookie = "splash_shown=1; path=/; secure; samesite=strict";
    onEnd?.();
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isVisible && (
          <div className={styles.content}>
            <motion.div
              className={styles.textContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
              }}
              transition={{
                when: "beforeChildren",
                delayChildren: 0,
                staggerChildren: 0,
              }}
              onAnimationComplete={handleEndAnimation}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      type: "tween",
                      duration: 0.5,
                      delay: 0,
                    },
                  },
                }}
              >
                MedRQE
              </motion.span>
            </motion.div>
            <motion.img
              src="/project/assets/Logo.svg"
              width={165}
              height={165}
              initial="visible"
              exit="exit"
              variants={{
                visible: { opacity: 1 },
                exit: { opacity: 0, transition: { duration: 0.3 } },
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
