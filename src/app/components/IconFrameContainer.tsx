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
          <LinkView href={item.href} className={styles.link} key={index}>
            <motion.div
              initial={{ opacity: 0.1, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1.3, transition: { duration: 2, type: "spring", delay: index * 0.15 } }}
            >
              <Image src={item.image} alt={item.label} width={106} height={106} />
            </motion.div>
            <p className={styles.label}>{item.label}</p>
          </LinkView>
        );
      })}
    </div>
  );
}
