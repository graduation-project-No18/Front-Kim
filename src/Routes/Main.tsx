import React, { useRef, useState, useEffect } from 'react';
import AboutHeader from '../components/AboutHeader';
import { AboutWrapper } from './About';
import styled from 'styled-components';
import { AboutFooter } from './Login';
import axios from 'axios';

const Main = () => {
  const [recording, setRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [response, setResponse] = useState(false);
  const [time, setTime] = useState(0);

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

  mediaRecorder.current?.addEventListener('dataavailable', event => {
    setRecordingBlob(event.data);
    // WebSocket 클라이언트를 생성하고 데이터를 전송합니다.
    const ws = new WebSocket('wss://localhost:8080');
    ws.addEventListener('open', () => {
      ws.send(event.data);
    });
    ws.addEventListener('message', event => {
      const gender = event.data;
      setResponse(gender);
      console.log('Gender:', gender);
    });
    ws.addEventListener('close', event => {
      if (event.wasClean) {
        alert(
          `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`,
        );
      } else {
        // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
        // event.code가 1006이 됩니다.
        //alert('[close] 커넥션이 죽었습니다.');
      }
    });
    ws.addEventListener('error', error => {
      //console.log(error);
    });
  });
  //new Date().getTime() - startTime
  return (
    <>
      <AboutHeader />
      <AboutWrapper>
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
            <a
              href={URL.createObjectURL(recordingBlob)}
              download="recording.wav"
            >
              Download
            </a>
          </div>
        )}
        <h3>{response}</h3>
        <AboutFooter>&copy; NO18. All rights reserved.</AboutFooter>
      </AboutWrapper>
    </>
  );
};

export default Main;

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
