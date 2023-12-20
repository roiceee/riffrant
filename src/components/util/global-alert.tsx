"use client";

import { GlobalAlertContext } from "@/context/global-alert";
import { useState } from "react";

function GlobalAlertModal({ children }: { children: React.ReactNode }) {
  const [contentState, setContentState] = useState("");
  const [show, setShow] = useState(false);

  //reset content after 5 seconds and hide the alert

  const showAlert = (content: string) => {
    setContentState(content);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  return (
    <GlobalAlertContext.Provider value={{ showAlert }}>
      {children}
      {show && (
        <div
          role="alert"
          className="alert w-fit fixed start-1/2 bottom-12 -translate-x-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{contentState}</span>
        </div>
      )}
    </GlobalAlertContext.Provider>
  );
}

export default GlobalAlertModal;
