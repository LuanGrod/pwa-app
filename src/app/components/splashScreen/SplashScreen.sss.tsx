"use client";

import { useEffect } from "react";
import Logo from "../icons/Logo";
import styles from "./SplashScreen.module.css";

type Props = {};

export default function SplashScreen({}: Props) {
  const logo = document.querySelector(".app-logo");
  const appName = document.querySelector(".app-name");
  const letters = document.querySelectorAll(".letter");

  useEffect(() => {
    // Etapa 1: Fade in do logo
    if (logo && appName && letters.length > 0) {
      logo.classList.add("visible");

      // Etapa 2: Mostrar letras com atraso
      letters.forEach((letter, index) => {
        setTimeout(() => {
          (letter as HTMLElement).style.opacity = "1";
        }, 1000 + index * 150);
      });

      // Etapa 3: Depois de 2s, esconder nome do app e mover logo
      setTimeout(() => {
        appName!.classList.add("fade-out");
      }, 2000 + letters.length * 150); // tempo total da animação de letras

      setTimeout(() => {
        logo!.classList.add("fade-out");
      }, 2300 + letters.length * 150); // tempo total da animação de letras
    }
  }, []);

  return (
    <div className={styles.container}>
      <Logo size={40} className="app-logo" />
      <h1 className="app-name" aria-label="medRQE">
        <span className="letter">m</span>
        <span className="letter">e</span>
        <span className="letter">d</span>
        <span className="letter">R</span>
        <span className="letter">Q</span>
        <span className="letter">E</span>
      </h1>
    </div>
  );
}
