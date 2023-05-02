import { useState } from 'react';

type RecorderProps = {
  stream: MediaStream;
};

type RecorderHook = {
  startRecording: () => void;
  stopRecording: () => void;
};

function useRecorder(stream: MediaStream): RecorderHook {
  const [chunks, setChunks] = useState<Blob[]>([]);

  function handleDataAvailable(event: BlobEvent) {
    setChunks(prevChunks => [...prevChunks, event.data]);
  }

  function startRecording() {
    setChunks([]);
    mediaRecorder.start();
  }

  function stopRecording() {
    mediaRecorder.stop();
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }

  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener('dataavailable', handleDataAvailable);

  return {
    startRecording,
    stopRecording,
  };
}

function Recorder({ stream }: RecorderProps) {
  const { startRecording, stopRecording } = useRecorder(stream);

  return {
    startRecording,
    stopRecording,
  };
}

export default Recorder;
