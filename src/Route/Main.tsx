import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecorderControls = styled.div`
  display: flex;
  margin-top: 20px;
`;

const RecorderControl = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${props => (props.disabled ? 'gray' : 'red')};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : 'darkred')};
  }
`;

const RecorderAudio = styled.audio`
  margin-top: 20px;
`;

const RecorderWaveform = styled.canvas`
  margin-top: 20px;
  width: 100%;
  height: 100px;
`;

function Recorder() {
  const [recording, setRecording] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && audioRef.current) {
      const audioContext = new AudioContext();
      const audioSrc = audioContext.createMediaElementSource(audioRef.current);
      const analyser = audioContext.createAnalyser();
      audioSrc.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWaveform = () => {
        if (canvasRef.current) {
          const canvasCtx = canvasRef.current.getContext('2d');
          if (canvasCtx) {
            requestAnimationFrame(drawWaveform);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = 'white';
            canvasCtx.fillRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height,
            );
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'red';
            canvasCtx.beginPath();
            const sliceWidth = canvasRef.current.width / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
              const v = dataArray[i] / 128.0;
              const y = (v * canvasRef.current.height) / 2;
              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }
              x += sliceWidth;
            }
            canvasCtx.lineTo(
              canvasRef.current.width,
              canvasRef.current.height / 2,
            );
            canvasCtx.stroke();
          }
        }
      };

      drawWaveform();
    }
  }, []);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks: Blob[] = [];
      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      });
      mediaRecorder.start();
      setRecording(true);
    });
  };

  const handlePlayRecording = () => {
    if (audioRef.current && !recording) {
      const audioCtx = new AudioContext();
      const audioSource = audioCtx.createMediaElementSource(audioRef.current);
      const gainNode = audioCtx.createGain();
      audioSource.connect(gainNode);
      audioSource.disconnect(); // 추가
      gainNode.connect(audioCtx.destination);
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording && audioRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      const audioCtx = new AudioContext();
      const audioSource = audioCtx.createMediaElementSource(audioRef.current);
      const analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      audioSource.disconnect(); // 추가
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      const newWaveform = Array.from(dataArray);
      setWaveform(newWaveform);
    }
  };

  return (
    <RecorderContainer>
      <RecorderControls>
        <RecorderControl disabled={recording} onClick={handleStartRecording}>
          Record
        </RecorderControl>
        <RecorderControl disabled={!recording} onClick={handleStopRecording}>
          Stop
        </RecorderControl>
      </RecorderControls>
      <RecorderAudio ref={audioRef} controls />
      <RecorderWaveform ref={canvasRef} />
    </RecorderContainer>
  );
}

export default Recorder;
