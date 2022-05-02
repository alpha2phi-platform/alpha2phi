import React from "react";

export type errorContext = {
  hasError: boolean;
  message?: string;
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
