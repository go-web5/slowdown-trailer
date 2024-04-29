import { useEffect, useContext } from 'react';
import { PromoContextPc } from "./ReleasePc";
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
  @media screen and (max-width: 1656px) {
    width: 43.4782609vw;
    border-width: 0.12vw;
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
  @media screen and (max-width: 1656px) {
    top: 0.97vw;
    right: 1.21vw;
    width: 10.27vw;
  }
  img {
    display: block;
    width: 100%;
    filter: drop-shadow(10px 10px 5px rgba(53, 50, 50, 0.5));
  }
  &.needle-drop {
    animation: needle-set-pc 1.6s forwards;
  }
  @keyframes needle-set-pc {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(24deg);
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
  @media screen and (max-width: 1656px) {
    left: 0.97vw;
    width: 31.64vw;
    height: 31.64vw;
    background-position: 0 0, 0.36vw 0.36vw;
    background-size: 0.72vw 0.72vw;
    border-width: 0.24vw;
  }
  img {
    width: 480px;
    height: 480px;
    border: 4px solid #3f3f3f;
    border-radius: 100vmax;
    @media screen and (max-width: 1656px) {
      width: 28.99vw;
      height: 28.99vw;
      border-width: 0.24vw;
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
  @media screen and (max-width: 1656px) {
    left: 0.85vw;
    bottom: 0.85vw;
    width: 4.35vw;
    height: 3.02vw;
    border-width: 0.24vw;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    @media screen and (max-width: 1656px) {
      width: 2.29vw;
    }
  }
`;

const PitchRotateNumber = styled.div`
  position: absolute;
  bottom: 14px;
  left: 94px;
  width: 80px;
  @media screen and (max-width: 1656px) {
    bottom: 0.85vw;
    left: 5.68vw;
    width: 4.83vw;
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
  @media screen and (max-width: 1656px) {
    right: 0.72vw;
    bottom: 2.66vw;
    width: 3.38vw;
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
  @media screen and (max-width: 1656px) {
    right: 4.71vw;
    bottom: 0.97vw;
    width: 8.21vw;
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
  @media screen and (max-width: 1656px) {
    top: 1.45vw;
    left: 1.45vw;
    width: 3.93vw;
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
  @media screen and (max-width: 1656px) {
    left: 0.97vw;
    bottom: 4.71vw;
    width: 5.74vw;
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
    @media screen and (max-width: 1656px) {
      left: 0.3vw;
      bottom: 0.18vw;
      width: 1.81vw;
    }
  }
  img {
    display: block;
  }
`;

const StartText = styled.p`
  position: absolute;
  left: -84px;
  bottom: 28px;
  font-size: 0.5rem;
  color: #fff;
  text-transform: capitalize;
  animation: text-blinking 1s ease-in-out infinite;
  @media screen and (max-width: 1656px) {
    left: -4.8vw;
    bottom: 1.69vw;
    font-size: clamp(0.3rem, 0.213rem + 0.28vw, 0.5rem);
  }
  @media screen and (max-width: 1079px) {
    left: .5vw;
    bottom: -3.8vw;
    font-size: 0.4rem;
  }
  span {
    display: block;
    margin-top: 2px;
    font-size: 0.25rem;
    @media screen and (max-width: 1656px) {
      font-size: clamp(0.188rem, 0.07rem + 0.17vw, 0.25rem);
    }
    @media screen and (max-width: 1079px) {
      margin-top: 0.12vw;
    }
  }
  &.none {
    display: none;
  }
  &::before,
  &::after  {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    content: "";
    @media screen and (max-width: 1079px) {
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &::before {
    right: -30px;
    width: 6px;
    height: 6px;
    border: 6px solid transparent;
    border-left: 6px solid #ffffff;
    box-sizing: border-box;
    @media screen and (max-width: 1656px) {
      right: -1.28vw;
      width: 0.36vw;
      height: 0.36vw;
      border-width: 0.36vw;
    }
    @media screen and (max-width: 1079px) {
      right: 0;
      top: -2.6vw;
      width: 1.5vw;
      height: 1.5vw;
      border: 0.8vw solid transparent;
      border-bottom: .8vw solid #ffffff;
    }
  }
  &::after {
    position: absolute;
    right: -34px;
    width: 14px;
    height: 6px;
    border-left: 12px solid #ffffff;
    @media screen and (max-width: 1656px) {
      width: 0;
      right: -0.72vw;
      height: 0.3vw;
      border-left-width: 0.48vw;
    }
    @media screen and (max-width: 1079px) {
      top: -2.3vw;
      width: 0.5vw;
      height: 1vw;
      border-left: 0;
      border-bottom: 1vw solid #ffffff;
    }
  }
  @keyframes text-blinking {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const TurntablePc = () => {
  const {isAnimatedA, setIsAnimatedA, isAnimatedB, setIsAnimatedB, setIsAnimatedC, setIsAnimatedD, setIsAnimatedE, setIsAnimatedF, setIsAnimatedG} = useContext(PromoContextPc);
  const [play, { stop }] = useSound(sound);

  const clickHandle = () => {
    setIsAnimatedA(prev => !prev);
    setIsAnimatedB(false);
    setIsAnimatedC(false);
    setIsAnimatedD(false);
    setIsAnimatedE(false);
    setIsAnimatedF(false);
    setIsAnimatedG(false);
  };
  
  const handleSoundEnd = () => {
    clickHandle();
    setIsAnimatedB(false);
    stop();
  };
  
  // A: ターンテーブルのアームセッティング、1.4秒後に音楽再生＆レコード回転開始
  useEffect(() => {
    if (isAnimatedA) {
      const animationTimeout = setTimeout(() => {
        setIsAnimatedB(prev => !prev);
        play();
      }, 1400);
      
      return () => {
        clearTimeout(animationTimeout);
      }
    } else {
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
          <img src={vinyl} alt="Slow Down Vinyl" className={isAnimatedB ? "rotate-vinyl" : ""} width="720" height="720" />
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
        <StartText className={isAnimatedA ? "none" : ""}>
          Click here
          <span>※音楽が流れます。</span>
        </StartText>
      </TurntableContainer>
    </TurntableWrapper>
  );
}

export default TurntablePc;