import React from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../core/app";
import { Button } from "../lib";

const BackButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-3 left-3">
      <Button
        className="bg-gray-400 hover:bg-gray-500 text-gray-900 border-0"
        onClick={() => dispatch(appActions.toMediaSelection())}
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;
