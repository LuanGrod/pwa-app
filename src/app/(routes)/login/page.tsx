import Login from "@global/component/form/Login";
import styles from "./page.module.css";
import Logo from "@/component/icon/Logo";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="login-container">
      <div className="logo">
        <h1 className="title">MedRQE</h1>
        <Logo size={139} className="logo" />
      </div>
      <Login />
    </div>
  );
}
