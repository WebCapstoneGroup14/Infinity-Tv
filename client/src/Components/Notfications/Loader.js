import React from "react";
import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <ClipLoader size={80} color="#f70505" />
    </div>
  );
}

export default Loader;
