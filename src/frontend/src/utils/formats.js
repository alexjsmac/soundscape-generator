export const mediaTypes = {
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    UNKNOWN: "UNKNOWN"
}

const formats = {
    image: ['jpg', 'jpeg', 'png'],
    video: ['mp4', 'mov']
};

function isImage(fileName) {
    return formats.image.filter((ext) => getExtension(fileName) === ext).length;
}

function isVideo(fileName) {
    return formats.video.filter((ext) => getExtension(fileName) === ext).length;
}

export function getMediaType(fileName) {
    console.log("filename", fileName);
    if (isImage(fileName)) return mediaTypes.IMAGE;
    else if (isVideo(fileName)) return mediaTypes.VIDEO;
    else return mediaTypes.UNKNOWN
}

function getExtension(fileName) {
    return fileName.split('.').pop();
}
