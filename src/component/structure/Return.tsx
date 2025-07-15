import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Header from "@global/component/header/Return";

type Props = {
  children: ReactNode;
};

export default function ReturnStructure({ children }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header />
        <main className="content-wrapper header">{children}</main>
      </ViewTransition>
    </>
  );
}
