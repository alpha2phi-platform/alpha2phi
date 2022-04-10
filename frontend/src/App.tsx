import React from "react";
import Slider from "@mui/material/Slider";

function App() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        className="text-teal-600"
        componentsProps={{ thumb: { className: "rounded-sm" } }}
      />
    </div>
  );
}

export default App;
