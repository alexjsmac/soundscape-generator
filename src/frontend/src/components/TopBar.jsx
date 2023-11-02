import React from "react";
import { DesktopMaxWidth } from "./lib";

export default () => (
  <div className="py-4 bg-primary">
    <DesktopMaxWidth>
      <div className="mx-4">
        <h1 className="text-white">Soundscape Generator</h1>
      </div>
    </DesktopMaxWidth>
  </div>
);
