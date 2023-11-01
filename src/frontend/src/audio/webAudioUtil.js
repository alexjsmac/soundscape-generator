const AudioContext = window.AudioContext || window.webkitAudioContext;
// problem with ResonanceAudio webpack build...so just adding script to index.html for now
const ResonanceAudio = window.ResonanceAudio;

const ctx = new AudioContext();
const resAudio = new ResonanceAudio(ctx);
resAudio.output.connect(ctx.destination);

function webAudioUtil(context, resonanceAudioScene) {
  return {
    createAudioSource: (audioElement) => {
      const audioElementSource = context.createMediaElementSource(audioElement);
      // connect as Resonance audio source
      const source = resonanceAudioScene.createSource();
      audioElementSource.connect(source.input);
      // Set the source position relative to the room center (source default position).
      source.setPosition();
      return source;
    },
    connectToStore: (store) => {
      store.subscribe(() => {
        const { roomDimensions, roomMaterials } = store.getState().audio;
        resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);
      });
    },
  };
}

export default webAudioUtil(ctx, resAudio);
