import { useEffect, useContext } from 'react';
import { PromoContextSp } from "./ReleaseSp";
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
  width: 80vw;
  height: auto;
  aspect-ratio: 453 / 353;
  background-color: #EDEDF1;
  border: 0.5vw solid #737373;
  border-radius: 1vw;
  box-sizing: border-box;
  transform: scale(4);
  transform-origin: left bottom;
  transition: transform .5s ease-out;
  &.active {
    transform: scale(1);
  }
  img {
    width: 100%;
  }
`;

const Needle = styled.div`
  position: absolute;
  top: 1vw;
  right: 1.6vw;
  z-index: 1;
  width: 20vw;
  transform-origin: 52% 26%;
  img {
    display: block;
    width: 100%;
    filter: drop-shadow(1.25vw 1.25vw 1vw rgba(53, 50, 50, 0.5));
  }
  &.needle-drop {
    animation: needle-set-sp 1.6s forwards;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 1.75vw;
  width: 58vw;
  height: 58vw;
  transform: translateY(-50%);
  border: .5vw solid #3f3f3f;
  border-radius: 100vmax;
  background-color: #3f3f3f;
  background-image:
    radial-gradient(#cdcdcd 24%, transparent 27%),
    radial-gradient(#cdcdcd 24%, transparent 27%);
  background-position: 0 0, .75vw .75vw;
  background-size: 1.5vw 1.5vw;
  img {
    width: 54vw;
    height: 54vw;
    border: .5vw solid #3f3f3f;
    border-radius: 100vmax;
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
  bottom: 2vw;
  left: 2vw;
  width: 8vw;
  height: 5vw;
  border: 0.5vw solid #0f0f0f;
  background-color: #EDEDF1;
  cursor: pointer;
  img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5vw;
  }
`;

const PitchRotateNumber = styled.div`
  position: absolute;
  left: 10.7vw;
  bottom: 2vw;
  width: 8vw;
  img {
    display: block;
    width: 100%;
  }
`;

const Pitch = styled.div`
  position: absolute;
  right: 2vw;
  bottom: 6vw;
  width: 6vw;
  img {
    display: block;
    width: 100%;
  }
`;

const Sticker = styled.div`
  position: absolute;
  right: 10vw;
  bottom: 1.5vw;
  width: 14vw;
  img {
    display: block;
    width: 100%;
  }
`;

const Adapter = styled.div`
  position: absolute;
  top: 3vw;
  left: 3vw;
  width: 7vw;
  img {
    display: block;
    width: 100%;
  }
`;

const Power = styled.div`
  position: absolute;
  left: 2vw;
  bottom: 8.5vw;
  width: 10.5vw;
  .power {
    width: 100%;
  }
  .power-text {
    position: absolute;
    z-index: 1;
    left: 0.6vw;
    bottom: 0.35vw;
    width: 3.3vw;
  }
  img {
    display: block;
    height: auto;
  }
`;

const StartText = styled.p`
  position: absolute;
  left: 1.4vw;
  bottom: -9.8vw;
  font-size: 0.4rem;
  color: #fff;
  text-transform: capitalize;
  animation: text-blinking 1s ease-in-out infinite;
  span {
    display: block;
    margin-top: 2px;
    font-size: 0.25rem;
  }
  &.none {
    display: none;
  }
  &::before,
  &::after  {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    content: '';
  }
  &::before {
    top: -5vw;
    width: 2vw;
    height: 2vw;
    border: 1.5vw solid transparent;
    border-bottom: 1.5vw solid #ffffff;
    box-sizing: border-box;
  }
  &::after {
    position: absolute;
    top: -4.2vw;
    width: 1.5vw;
    height: 2vw;
    border-bottom: 1.5vw solid #ffffff;
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

const TurntableSp = () => {
  const {isAnimated, setIsAnimated} = useContext(PromoContextSp);
  const [play, { stop }] = useSound(sound);

  const clickHandle = () => {
    setIsAnimated(prev => ({
      ...prev,
      a: !prev.a,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false
    }));
  };
  
  const handleSoundEnd = () => {
    clickHandle();
    setIsAnimated(prev => ({ ...prev, b: false }));
    stop();
  };
  
  // A: ターンテーブルのアームセッティング、1.4秒後に音楽再生＆レコード回転開始
  useEffect(() => {
    if (isAnimated.a) {
      const animationTimeout = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, b: !prev.b }));
        play();
      }, 1400);
      
      return () => {
        clearTimeout(animationTimeout);
      }
    } else {
      setIsAnimated(prev => ({ ...prev, b: false }));
      stop();
    }
  }, [isAnimated.a, setIsAnimated, play, stop]);

  return (
    <TurntableWrapper>
      <TurntableContainer className={isAnimated.a ? "active" : ""}>
        <Needle className={isAnimated.a ? "needle-drop" : ""}>
          <img src={needleImg} alt="Needle" />
        </Needle>
        <Rotate href="https://linkco.re/xq9Xv6Ne" target="_blank">
          <img src={vinyl} alt="Slow Down Vinyl" className={isAnimated.b ? "rotate-vinyl" : ""} />
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
        <StartText className={isAnimated.a ? "none" : ""}>
          Tap here
          <span>※音楽が流れます。</span>
        </StartText>
      </TurntableContainer>
    </TurntableWrapper>
  );
}

export default TurntableSp;