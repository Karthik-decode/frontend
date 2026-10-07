import React from "react";
import {
  Navigate,
} from "react-router-dom";

function VerifyCode() {
  return (
    <Navigate
      to="/login"
      replace
    />
  );
}

export default VerifyCode;