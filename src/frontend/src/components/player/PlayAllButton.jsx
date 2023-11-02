import React, { useState } from "react";
import { connect } from "react-redux";
import { soundActions } from "../../core/sounds";
import { Button } from "../lib";

const GlobalAudio = ({ playAllSounds, stopAllSounds }) => {
  const [globalPlaying, setGlobalPlaying] = useState(false);

  const togglePlay = () => {
    if (globalPlaying) {
      stopAllSounds();
      setGlobalPlaying(false);
    } else {
      playAllSounds();
      setGlobalPlaying(true);
    }
  };

  return (
    <Button onClick={togglePlay}>
      {globalPlaying ? "Stop All" : "Play All"}
    </Button>
  );
};

export default connect(null, soundActions)(GlobalAudio);
