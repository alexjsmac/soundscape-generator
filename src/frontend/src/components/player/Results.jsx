import React from "react";
import { useSelector } from "react-redux";
import Result from "./Result";

const Results = () => {
  const keywords = useSelector((state) => state.general.keywords);
  const isScanning = useSelector((state) => state.media.isScanning);
  const hasError = useSelector((state) => state.media.hasError);

  if (hasError) {
    return (
      <div className="w-full text-red-700 p-2 mt-2">
        <b>Error loading media</b>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div>
        {/* <Icon type="loading" style={{fontSize: "28px", padding: "3rem 0 1rem"}}/> */}
        <b>Scanning Media For Labels</b>
      </div>
    );
  }

  return (
    <>
      {keywords.map((keyword) => (
        <Result keyword={keyword} key={keyword} />
      ))}
    </>
  );
};

export default Results;
