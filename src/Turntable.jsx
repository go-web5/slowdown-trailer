import { useEffect, useContext } from 'react';
import { PromoContext } from "./App";
import useSound from 'use-sound';
import styled from "styled-components";

// 画像読み込み
import needleImg from "/src/assets/needle.png";
import vinyl from "/src/assets/slowdown-vinyl.png";
import sound from '/src/assets/slow_down_trailer.mp3';
import bgrSticker from "/src/assets/bgr-sticker.png";
import pitchController from "/src/assets/pitch-controller.png";
import adapter from "/src/assets/adapter.png";
import pitchRotateNumber from "/src/assets/pitch-rotate-number.svg";
import startText from "/src/assets/start-text.svg";
import power from "/src/assets/power.png";
import powerText from "/src/assets/power-text.svg";

const TurntableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TurntableContainer = styled.div`
  position: relative;
  width: 720px;
  height: auto;
  aspect-ratio: 453 / 353;
  background-color: #EDEDF1;
  border: 2px solid #737373;
  border-radius: 2px;
  transform: scale(5);
  transform-origin: left bottom;
  transition: transform .4s ease-out;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    width: 80vw;
    transform: scale(4);
    transition-duration: .5s;
    border-width: 0.5vw;
    border-radius: 1vw;
  }
  &.active {
    transform: scale(1);
  }
  img {
    width: 100%;
  }
`;

const Needle = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 170px;
  transform-origin: 52% 26%;
  z-index: 1;
  @media screen and (max-width: 768px) {
    top: 1vw;
    right: 1.6vw;
    width: 20vw;
  }
  img {
    display: block;
    width: 100%;
    filter: drop-shadow(10px 10px 5px rgba(53, 50, 50, 0.5));
    @media screen and (max-width: 768px) {
      filter: drop-shadow(1.25vw 1.25vw 1vw rgba(53, 50, 50, 0.5));
    }
  }
  &.needle-drop {
    animation: needle-set-pc 1.6s forwards;
    @media screen and (max-width: 768px) {
      animation: needle-set-sp 1.6s forwards;
    }
  }
  @keyframes needle-set-pc {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(24deg);
    }
  }
  @keyframes needle-set-sp {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(26deg);
    }
  }
`;

const Rotate = styled.a`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 524px;
  height: 524px;
  border-radius: 100vmax;
  background-color: #3f3f3f;
  background-image:
    radial-gradient(#cdcdcd 24%, transparent 27%),
    radial-gradient(#cdcdcd 24%, transparent 27%);
  background-position: 0 0, 6px 6px;
  background-size: 12px 12px;
  border: 4px solid #3f3f3f;
  @media screen and (max-width: 768px) {
    left: 1.75vw;
    width: 58vw;
    height: 58vw;
    background-image:
      radial-gradient(#cdcdcd 24%, transparent 27%),
      radial-gradient(#cdcdcd 24%, transparent 27%);
    background-position: 0 0, .75vw .75vw;
    background-size: 1.5vw 1.5vw;
    border-width: .5vw;
  }
  img {
    width: 480px;
    height: 480px;
    border: 4px solid #3f3f3f;
    border-radius: 100vmax;
    @media screen and (max-width: 768px) {
      width: 54vw;
      height: 54vw;
      border-width: .5vw;
    }
    &.rotate-vinyl {
      animation: rotate_anime 6s linear infinite;
    }
  }
  @keyframes rotate_anime {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StartButton = styled.button`
  display: block;
  position: absolute;
  bottom: 14px;
  left: 14px;
  width: 72px;
  height: 50px;
  background-color: #EDEDF1;
  border: 4px solid #0f0f0f;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    bottom: 2vw;
    left: 2vw;
    width: 8vw;
    height: 5vw;
    border-width: 0.5vw;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    @media screen and (max-width: 768px) {
      width: 5vw;
    }
  }
`;

const PitchRotateNumber = styled.div`
  position: absolute;
  bottom: 14px;
  left: 94px;
  width: 80px;
  @media screen and (max-width: 768px) {
    width: 8vw;
    left: 10.7vw;
    bottom: 2vw;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const Pitch = styled.div`
  position: absolute;
  right: 12px;
  bottom: 44px;
  width: 56px;
  @media screen and (max-width: 768px) {
    right: 2vw;
    bottom: 6vw;
    width: 6vw;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const Sticker = styled.div`
  position: absolute;
  right: 78px;
  bottom: 16px;
  width: 136px;
  @media screen and (max-width: 768px) {
    right: 10vw;
    bottom: 1.5vw;
    width: 14vw;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const Adapter = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 65px;
  @media screen and (max-width: 768px) {
    width: 7vw;
    top: 3vw;
    left: 3vw;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const Power = styled.div`
  position: absolute;
  left: 16px;
  bottom: 78px;
  width: 95px;
  @media screen and (max-width: 768px) {
    width: 10.5vw;
    left: 2vw;
    bottom: 8.5vw;
  }
  .power {
    width: 100%;
  }
  .power-text {
    position: absolute;
    left: 5px;
    bottom: 3px;
    z-index: 1;
    width: 30px;
    @media screen and (max-width: 768px) {
      left: 0.6vw;
      bottom: 0.35vw;
      width: 3.3vw;
    }
  }
  img {
    display: block;
  }
`;

const Turntable = () => {
  const {isAnimatedA, setIsAnimatedA, isAnimatedB, setIsAnimatedB} = useContext(PromoContext);
  const [play, { stop }] = useSound(sound);

  const clickHandle = () => {
    setIsAnimatedA(prev => !prev);
  };
  
  const handleSoundEnd = () => {
    clickHandle();
    setIsAnimatedB(false);
    stop();
  };
  
  useEffect(() => {
    if (isAnimatedA) {
      console.log("START");
      const animationTimeout = setTimeout(() => {
        setIsAnimatedB(prev => !prev);
        play();
      }, 1400);
      
      return () => {
        console.log("CLEAN UP");
        clearTimeout(animationTimeout);
      }
    } else {
      console.log("STOP");
      setIsAnimatedB(false);
      stop();
    }
  }, [isAnimatedA, setIsAnimatedB, play, stop]);

  return (
    <TurntableWrapper>
      <TurntableContainer className={isAnimatedA ? "active" : ""}>
        <Needle className={isAnimatedA ? "needle-drop" : ""}>
          <img src={needleImg} alt="Needle" />
        </Needle>
        <Rotate href="https://linkco.re/xq9Xv6Ne" target="_blank">
          <img src={vinyl} alt="Slow Down Vinyl" className={isAnimatedB ? "rotate-vinyl" : ""} />
        </Rotate>
        <StartButton onClick={clickHandle}>
          <img src={startText} alt="start・stop" />
        </StartButton>
        <PitchRotateNumber>
          <img src={pitchRotateNumber} alt="33回転・45回転" />
        </PitchRotateNumber>
        <Pitch>
          <img src={pitchController} alt="ピッチコントローラー" />
        </Pitch>
        <Sticker>
          <img src={bgrSticker} alt="Bold Gamble Records" />
        </Sticker>
        <Adapter>
          <img src={adapter} alt="Adapter" />
        </Adapter>
        <Power>
          <img src={power} alt="Power" className="power" />
          <img src={powerText} alt="on off" className="power-text" />
        </Power>
        <audio src={sound} onEnded={handleSoundEnd} style={{ display: 'none' }} />
      </TurntableContainer>
    </TurntableWrapper>
  );
}

export default Turntable;