import { useSelector } from "react-redux";
import { mediaTypes } from "../../core/media/mediaTypes";
import { useScreen } from "../../hooks";
import { H2 } from "../lib";

import Media from "./Media";
import PlayAllButton from "../player/PlayAllButton";
import BackButton from "./BackButton";
import RoomSettings from "./RoomSettings";
import AddLabelForm from "./AddLabelForm";
import Results from "./Results";

const PlayerPage = () => {
  const { isMobile } = useScreen();
  const mediaSource = useSelector((state) => state.media.source);
  const mediaType = useSelector((state) => state.media.type);

  return (
    <div className="h-full h-max-screen flex flex-col">
      {mediaSource && (
        <div className="flex flex-col relative flex-grow-0 flex-shrink-1 flex-basis-[20vh] h-[20vh]">
          <Media src={mediaSource} type={mediaType} />
          {isMobile && <BackButton />}
        </div>
      )}
      <div className="border box-shadow-border">
        <div className="grid grid-cols-2 p-2">
          <div>
            <H2>Audio Clips</H2>
            <p className="text-xs">
              Here are the generated labels for this
              {mediaType === mediaTypes.VIDEO && " video"}
              {mediaType === mediaTypes.IMAGE && " image"}
            </p>
          </div>
          <AddLabelForm />
        </div>
        <div className="grid grid-cols-3 gap-4 m-2">
          <div className="flex items-center">
            <PlayAllButton />
          </div>
          <RoomSettings />
        </div>
      </div>
      <div className="h-max-full grid grid-cols-2 overflow-y-scroll">
        <Results />
      </div>
    </div>
  );
};

export default PlayerPage;
