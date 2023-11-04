import { mediaTypes } from "../../core/media/mediaTypes";
import ImageCard from "./ImageCard";

const files = (() => {
  const URL = "https://s3.amazonaws.com/soundscape-generator-photos/examples/";
  const exampleFiles = [
    { type: mediaTypes.IMAGE, fileName: "ship.jpg", name: "Ship" },
    { type: mediaTypes.IMAGE, fileName: "party.jpg", name: "Party Scene" },
    { type: mediaTypes.IMAGE, fileName: "concert.jpeg", name: "Concert" },
    { type: mediaTypes.IMAGE, fileName: "hockey.jpg", name: "Hockey Game" },
    {
      type: mediaTypes.VIDEO,
      fileName: "big_buck_bunny.mp4",
      name: "Bunny Video",
    },
  ];
  return exampleFiles.map((file) => {
    return {
      ...file,
      url: URL + file.fileName,
    };
  });
})();

function MediaExamples({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file, i) => {
        return (
          <div key={i} className="cursor-pointer">
            <ImageCard
              name={file.name}
              src={file.url}
              isVideo={file.type === mediaTypes.VIDEO}
              onClick={() => onSelect(file.fileName, file.url)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MediaExamples;
