import React, { createContext, useState } from "react";

export const GlobalAlertContext = createContext({
  showAlert: (str: string) => {},
});
