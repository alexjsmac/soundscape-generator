export const mediaTypes = {
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    UNKNOWN: "UNKNOWN"
}

export function getMediaType(fileName) {
    if (isImage(fileName)) return mediaTypes.IMAGE;
    else if (isVideo(fileName)) return mediaTypes.VIDEO;
    else return mediaTypes.UNKNOWN
}

const formats = {
    image: ['jpg', 'jpeg', 'png'],
    video: ['mp4', 'mov']
};

function isImage(fileName) {
    return formats.image.includes(getExtension(fileName));
}

function isVideo(fileName) {
    formats.video.includes(getExtension(fileName));
}

function getExtension(fileName) {
    return fileName.split('.').pop();
}
