"use client";

import * as motion from "motion/react-client";
import styles from "./SplashScreen.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";

type Props = { onEnd?: () => void };

export default function SplashScreen({ onEnd }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleEndAnimation = () => {
    setIsVisible(false);
    // // session-cookie: sem max-age nem expires
    document.cookie = "splash_shown=1; path=/; secure; samesite=strict";
    onEnd?.();
    // // força re­render no server para pegar o cookie
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
              initial="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
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
                visible: {},
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 0.1,
                },
              }}
              onAnimationComplete={() => handleEndAnimation()}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      type: "spring",
                      duration: 1.75,
                    },
                  },
                }}
              >
                MedRQE
              </motion.span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
