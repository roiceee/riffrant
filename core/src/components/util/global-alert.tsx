"use client";

import { GlobalAlertContext } from "@/context/global-alert";
import { useState } from "react";

function GlobalAlertModal({ children }: { children: React.ReactNode }) {
  const [contentState, setContentState] = useState("");
  const [show, setShow] = useState(false);

  //reset content after 5 seconds and hide the alert

  //reset timer when showAlert is triggered simultaneously
  
  const resetTimer = () => {
    if (show) {
      setShow(true);
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setShow(false);
      setContentState("");
    }, 5000);
  };

  let timer: NodeJS.Timeout;

  const showAlert = (content: string) => {
    setContentState(content);
    setShow(true);
    resetTimer();
  };

  return (
    <GlobalAlertContext.Provider value={{ showAlert }}>
      {children}
      {show && (
        <div
          role="alert"
          className="alert w-fit fixed start-1/2 bottom-12 -translate-x-1/2"
        >
          <span className="text-sm">{contentState}</span>
        </div>
      )}
    </GlobalAlertContext.Provider>
  );
}

export default GlobalAlertModal;
