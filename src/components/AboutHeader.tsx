import React from 'react';
import {
  Variants,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled(motion.nav)`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderLogo = styled(motion.div)`
  width: 60%;
  font-size: 30px;
  color: ${props => props.theme.white.lighter};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderButton = styled(motion.div)`
  width: 20%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
`;

const AboutBtn = styled.div`
  position: relative;
  font-size: 18px;
  color: ${props => props.theme.white.darker};
  &:hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBtn = styled.div`
  position: relative;
  font-size: 18px;
  color: ${props => props.theme.white.darker};
  &:hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterBtn = styled.div`
  position: relative;
  font-size: 18px;
  color: ${props => props.theme.white.darker};
  &:hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NowDot = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  bottom: -13px;
  border-radius: 3px;
  background-color: white;
`;

function AboutHeader() {
  const navigate = useNavigate();
  const logoClicked = () => {
    navigate('/');
  };
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    if (Number(latest) > 300) {
      navAnimation.start({
        backgroundColor: 'rgba(0,0,0,0.8)',
      });
    } else {
      navAnimation.start({
        backgroundColor: 'transparent',
      });
    }
  });
  const nowAbout = useMatch('/');
  const nowLogin = useMatch('/login');
  const nowRegister = useMatch('/register');
  return (
    <>
      <HeaderWrapper animate={navAnimation}>
        <HeaderLogo onClick={logoClicked}>NO18</HeaderLogo>
        <HeaderButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <AboutBtn>
              About{nowAbout ? <NowDot layoutId="nowDot" /> : null}
            </AboutBtn>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <LoginBtn>
              Login{nowLogin ? <NowDot layoutId="nowDot" /> : null}
            </LoginBtn>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <RegisterBtn>
              Register{nowRegister ? <NowDot layoutId="nowDot" /> : null}
            </RegisterBtn>
          </Link>
        </HeaderButton>
      </HeaderWrapper>
    </>
  );
}

export default AboutHeader;
