import { startTransition } from "react";
import { ActionInterface } from "./ActionInterface";

export default class RedirectAction implements ActionInterface {
  // Properties
  private router?: any;
  private redirectPath: string;
  private delay: number;

  // Constructor
  /**
   * @param router - Next.js router instance (optional)
   * @param redirectPath - Path to redirect to (default: "/")
   * @param delay - Delay in milliseconds before redirect (default: 100)
   */
  constructor(
    router?: any,
    redirectPath: string = "/",
    delay: number = 100
  ) {
    this.router = router;
    this.redirectPath = redirectPath;
    this.delay = delay;
  }

  // Methods
  handleSuccess: (result: any) => Promise<void> | void = async (result: any) => {
    // Use window.location.replace if available (client-side)
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.replace(this.redirectPath);
      }, this.delay);
    } 
    // Fallback to router.push if router is available (SSR/client)
    else if (this.router && typeof this.router.push === "function") {
      startTransition(() => {
        this.router.push(this.redirectPath);
      });
    }
    // If neither is available, log warning
    else {
      console.warn("RedirectAction: Neither window.location nor router available for redirect");
    }
  };
}
