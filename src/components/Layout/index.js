import React from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Sidebar />
      <div className="right">
        <Header />
        <div className="content-app">
          <div className="container-fluid">
            <div style={{ paddingLeft: 30, paddingRight: 30 }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
