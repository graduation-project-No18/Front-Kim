import React, { useRef, useState, useEffect } from 'react';
import { AboutWrapper } from './About';
import styled from 'styled-components';
import axios from 'axios';
import { Variants, motion } from 'framer-motion';
import MainHeader from '../components/MainHeader';
import { useNavigate } from 'react-router-dom';

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

function RecordVoice() {
  const [recording, setRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  // const [response, setResponse] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [modalResponse, setModalResponse] = useState(''); // 모달에 표시할 응답
  const navigate = useNavigate();

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

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasRef.current) return;
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasContext.fillStyle = 'rgb(47, 47, 47)';
        canvasContext.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        const barWidth = (canvasRef.current.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvasRef.current.height;

          canvasContext.fillStyle = `rgb(${barHeight + 100}, 117, 153)`;
          canvasContext.fillRect(
            x,
            canvasRef.current.height - barHeight,
            barWidth,
            barHeight,
          );

          x += barWidth + 1;
        }
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

    const tracks = mediaRecorder.current?.stream.getTracks();
    tracks?.forEach(track => track.stop());
  };

  const handleMoveToEditProfile = () => {
    navigate('/main/editprofile');
  };

  const handleSendData = async () => {
    const formData = new FormData();
    formData.append('audio', recordingBlob as Blob);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/recording',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzM5NzY0NTY5Iiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg2ODg3NzcyfQ.SP4zE6PL3tw29x6xV2zLECsnxbCoNkAzTWcRTIaqgew',
          },
        },
      );
      console.log(response.data);
      setModalResponse(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalResponse('다음에 다시 시도해주세요');
      setShowModal(true);
    }
  };

  mediaRecorder.current?.addEventListener('dataavailable', event => {
    setRecordingBlob(event.data);
  });
  //new Date().getTime() - startTime
  return (
    <>
      <MainHeader />
      <AboutWrapper>
        <RecordBox
          variants={RecordBoxVariants}
          initial="initial"
          animate="animate"
        >
          <h2>편하게 낼 수 있는 높은 소리를 내세요</h2>
          <Canvas ref={canvasRef} />
          {recording ? (
            <>
              <Button onClick={handleStopRecording}>Stop Recording</Button>
              {startTime !== null && <div>녹음 시간: {time} 초</div>}
            </>
          ) : (
            <Button onClick={handleStartRecording}>Start Recording</Button>
          )}

          {recordingBlob && (
            <div>
              <audio controls src={URL.createObjectURL(recordingBlob)} />
              <Button onClick={handleSendData}>Send Data</Button>
            </div>
          )}
          {/* <h3>응답{response}</h3> */}
        </RecordBox>
        {showModal && (
          <Modal>
            <ModalContent>
              <h2>서버 응답</h2>
              <p>{modalResponse}</p>
              <Button onClick={handleMoveToEditProfile}>
                프로필로 이동하기
              </Button>
              <Button onClick={() => setShowModal(false)}>닫기</Button>
            </ModalContent>
          </Modal>
        )}
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
  margin: 2px 6px;
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

const Modal = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }
`;
