"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { LinkView } from "@global/component/atomic/LinkView";

type Link = {
  href: string;
  image: string;
  label: string;
};

type Props = {
  links: Link[];
  variation?: boolean;
};

export default function IconFrameContainer({ links, variation }: Props) {
  return (
    <div className={`icon-frame-container  ${variation ? "variation" : ""}`}>
      {links.map((item, index) => {
        return (
          <LinkView href={item.href} key={index} className={`linkWrapper ${variation ? "variation" : ""}`}>
            <motion.div
              className={`link`}
              initial={{ opacity: 0.1, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, type: "spring", delay: index * 0.15 } }}
            >
              <Image loading="eager" priority className="image" src={item.image} alt={item.label} width={106} height={106} />
              <p className="label">{item.label}</p>
            </motion.div>
          </LinkView>
        );
      })}
    </div>
  );
}
