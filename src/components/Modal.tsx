/* eslint-disable react/react-in-jsx-scope */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

function Modal({ isOpen }: any) {
  return (
    <ModalContainer>
      <h2>추천목록</h2>
      <p>내용</p>
    </ModalContainer>
  );
}

export default Modal;

const ModalContainer = styled.div`
  width: 80%;
  height: 60%;
  margin-top: 20px;
  padding: 20px;
  background-color: #61dafb;
  text-align: left;
`;
