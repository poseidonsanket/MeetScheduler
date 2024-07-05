"use client"
import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const DashBoard = () => {
  return (
    <div>
      DashBoard
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
};

export default DashBoard;
