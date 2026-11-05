"use client";
import { Toaster } from "react-hot-toast";

const ToastMessage = () => {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#05893e",
          color: "#fafcfa",
        },
        success: {
          duration: 3000,
          iconTheme: { primary: "#008F4C", secondary: "#fff" },
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
};

export default ToastMessage;
