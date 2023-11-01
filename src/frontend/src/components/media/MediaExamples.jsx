import styled from "styled-components";
import ImageCard from "./ImageCard";

const files = (() => {
  const URL = "https://s3.amazonaws.com/soundscape-generator-photos/examples/";
  const exampleFiles = [
    { type: "IMG", fileName: "ship.jpg", name: "Ship" },
    { type: "IMG", fileName: "party.jpg", name: "Party Scene" },
    { type: "IMG", fileName: "concert.jpeg", name: "Concert" },
    { type: "IMG", fileName: "hockey.jpg", name: "Hockey Game" },
    { type: "VID", fileName: "big_buck_bunny.mp4", name: "Bunny Video" },
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
        const onClick = () => onSelect(file.fileName, file.url);
        return (
          <div key={i} className="cursor-pointer">
            <ImageCard
              name={file.name}
              src={file.url}
              isVideo={file.type === "VID"}
              onClick={onClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MediaExamples;
