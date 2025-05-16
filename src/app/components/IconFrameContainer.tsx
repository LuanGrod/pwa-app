"use client";

import { motion } from "motion/react";
import Link from "next/link";
import styles from "./IconFrameContainer.module.css";
import Image from "next/image";
import { LinkView } from "./LinkView";

type Link = {
  href: string;
  image: string;
  label: string;
};

type Props = {
  links: Link[];
};

export default function IconFrameContainer({ links }: Props) {
  return (
    <div className={styles.container}>
      {links.map((item, index) => {
        return (
          <LinkView href={item.href} key={index}>
            <motion.div
              className={styles.link}
              initial={{ opacity: 0.02, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, type: "spring", delay: index * 0.15 } }}
            >
              <Image className={styles.image} src={item.image} alt={item.label} width={106} height={106} />
              <p className={styles.label}>{item.label}</p>
            </motion.div>
          </LinkView>
        );
      })}
    </div>
  );
}
