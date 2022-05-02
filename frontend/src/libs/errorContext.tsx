import React from "react";

export type ErrorContext = {
  hasError: boolean;
  title?: string;
  error?: any;
};

// export function onError(error) {
//   let message = error.toString();
//
//   // Auth errors
//   if (!(error instanceof Error) && error.message) {
//     message = error.message;
//   }
//
//   alert(message);
// }
