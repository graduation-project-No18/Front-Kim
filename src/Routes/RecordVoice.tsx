import React, { useRef, useState, useEffect } from 'react';
import AboutHeader from '../components/AboutHeader';
import { AboutWrapper } from './About';
import styled from 'styled-components';
import { AboutFooter } from './Login';
import axios from 'axios';
import { Variants, motion } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import DetailHeader from '../components/DetailHeader';

const RecordBoxVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};
// if (!canvasRef.current) return;
function RecordVoice() {
  const [recording, setRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [response, setResponse] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext('2d');
      setCanvasContext(canvasContext);
    }
  }, []);

  useEffect(() => {
    if (mediaRecorder.current && canvasContext) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(
        mediaRecorder.current.stream,
      );
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const draw = () => {
        if (!canvasRef.current) return;
        requestAnimationFrame(draw);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        canvasContext.fillStyle = 'rgb(47, 47, 47)';
        canvasContext.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'rgb(117, 251, 153)';

        canvasContext.beginPath();

        const sliceWidth = (canvasRef.current.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvasRef.current.height) / 2;

          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasContext.lineTo(
          canvasRef.current.width,
          canvasRef.current.height / 2,
        );
        canvasContext.stroke();
      };

      draw();
    }
  }, [mediaRecorder.current, canvasContext]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (recording && startTime !== null) {
      intervalId = setInterval(() => {
        const duration = new Date().getTime() - startTime;
        setTime(Math.floor(duration / 1000));
        console.log(`Recording duration: ${duration}ms`);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [recording, startTime]);

  const handleStartRecording = async () => {
    setRecordingBlob(null);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    setRecording(true);
    setStartTime(new Date().getTime());
  };

  const handleStopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
    setStartTime(null);
  };

  const handleSendData = async () => {
    const formData = new FormData();
    formData.append('audio', recordingBlob as Blob);
    try {
      const response = await axios.post('http://localhost:8080', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  mediaRecorder.current?.addEventListener('dataavailable', event => {
    setRecordingBlob(event.data);
  });
  //new Date().getTime() - startTime
  return (
    <>
      <DetailHeader />
      <AboutWrapper>
        <RecordBox
          variants={RecordBoxVariants}
          initial="initial"
          animate="animate"
        >
          <Canvas ref={canvasRef} />
          {recording ? (
            <>
              <Button onClick={handleStopRecording}>Stop Recording</Button>
              {startTime !== null && <div> 녹음 시간: {time} 초</div>}
            </>
          ) : (
            <Button onClick={handleStartRecording}>Start Recording</Button>
          )}

          {recordingBlob && (
            <div>
              <audio controls src={URL.createObjectURL(recordingBlob)} />
              {/* <a
                href={URL.createObjectURL(recordingBlob)}
                download="recording.wav"
              >
                Download
              </a> */}
              <Button onClick={handleSendData}>Send Data</Button>
            </div>
          )}
          <h3>{response}</h3>
        </RecordBox>
      </AboutWrapper>
    </>
  );
}

export default RecordVoice;

const RecordBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 50%;
  justify-content: center;

  position: absolute;
  background-color: ${props => props.theme.black.lighter};
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 30%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.blue.dark};
  border: none;
  width: 300px;
  height: 50px;
  border-radius: 8px;
  color: ${props => props.theme.white.darker};
  font-size: 20px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.white.darker};
    scale: 1.05;
    transition: color 0.2s ease-in-out, scale 0.2s ease-in-out;
  }
`;