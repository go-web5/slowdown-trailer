import { createContext, useState, useEffect } from 'react';
export const PromoContextPc = createContext();
import styled from "styled-components";
import TurntablePc from './TurntablePc';
import Artwork from './Artwork';

// 画像読み込み
import apple from "/src/assets/apple-music-logo.png";
import spotify from "/src/assets/spotify-logo.png";
import amazon from "/src/assets/amazon-logo.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-x: hidden;
`;

const Inner = styled.div`
  display: flex;
  gap: 156px;   
  width: 720px;
  margin-inline: auto;
  padding: 0 48px;
  &.left-move {
    animation: left-move 3s ease-in-out forwards;
    @media screen and (max-width: 1656px) {
      animation: left-move-tab 3s ease-in-out forwards;
    }
  }
  @media screen and (max-width: 1656px) {
    width: 43.4782609vw;
    gap: 7vw;
    padding: 0 6vw;
  }
  @keyframes left-move {
    0% {
      width: 720px;
    }
    100% {
      width: 1560px;
    }
  }
  @keyframes left-move-tab {
    0% {
      width: 43.4782609vw;
    }
    100% {
      width: calc(100% - 6vw * 2);
    }
  }
`;

const Right = styled.div`
  display: none;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.active {
    display: flex;
  }
`;

const H1 = styled.h1`
  word-break: keep-all;
  color: white;
  text-align: center;
  font-size: 5rem;
  @media screen and (max-width: 1656px) {
    font-size: clamp(1.6rem, 4vw, 5rem);
  }
  .small {
    display: block;
    margin-top: 60px;
    font-weight: 400;
    font-size: 2.25rem;
    @media screen and (max-width: 1656px) {
      margin-top: 3.62vw;
      font-size: clamp(0.6rem, 1.6vw, 2.25rem);
    }
  }
  .date {
    display: inline-block;
    margin-right: 12px;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    @media screen and (max-width: 1656px) {
      margin-right: 0.72vw;
      font-size: clamp(1rem, 1.6vw, 2.8rem);
    }
  }
  .day {
    display: inline-block;
    letter-spacing: 0.1em;
  }
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 208px 152px 208px;
  gap: 40px;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  @media screen and (max-width: 1656px) {
    grid-template-columns: 12.56vw 9.18vw 12.56vw;
    gap: 2.42vw;
    margin-top: 3.62vw;
  }
  a {
    display: inline-block;
    width: 100%;
    img {
      width: 100%;
    }
  }
  &.active {
    opacity: 1;
  }
`;

const SplitText = styled.span`
  display: block;
  text-align: center;
  &.blinking {
    color: #cf1313;
    animation: blinking 1s ease-in-out infinite;
  }
  @keyframes blinking {
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

const infoList = [
  {
    href: "https://music.apple.com/jp/album/1738276723?mt=1&app=music&at=10l7qr",
    imgSrc: apple,
    imgAlt: "Listen on Apple Music"
  },
  {
    href: "https://open.spotify.com/intl-ja/album/2JBmHmExVpG5MpIO3xfVa4",
    imgSrc: spotify,
    imgAlt: "Spotify"
  },
  {
    href: "https://www.amazon.co.jp/music/player?&_encoding=UTF8&tag=tcjaz-22&linkCode=ur2&camp=247&creative=1211",
    imgSrc: amazon,
    imgAlt: "amazon music"
  },
]

function App() {
  const [isAnimatedA, setIsAnimatedA] = useState(false);
  const [isAnimatedB, setIsAnimatedB] = useState(false);
  const [isAnimatedC, setIsAnimatedC] = useState(false);
  const [isAnimatedD, setIsAnimatedD] = useState(false);
  const [isAnimatedE, setIsAnimatedE] = useState(false);
  const [isAnimatedF, setIsAnimatedF] = useState(false);
  const [isAnimatedG, setIsAnimatedG] = useState(false);

  // B: 3秒後にターンテーブルが左に移動開始
  useEffect(() => {
    if(isAnimatedB) {
      console.log("3秒後にターンテーブルが左に移動開始");
      const changeTimeout2 = setTimeout(() => {
        setIsAnimatedC(prev => !prev);
      }, 3000);

      return () => {
        clearTimeout(changeTimeout2);
      }
    }
  }, [isAnimatedB, setIsAnimatedC]);

  // C: 3秒後に右側のテキストエリア非表示で存在
  useEffect(() => {
    if(isAnimatedC) {
      console.log("3秒後にテキスト表示");
      const changeTimeout3 = setTimeout(() => {
        setIsAnimatedD(prev => !prev);
      }, 3000);

      return () => {
        clearTimeout(changeTimeout3);
      }
    }
  }, [isAnimatedC, setIsAnimatedD])

  // D: 右側のテキスト表示開始
  useEffect(() => {
    if(isAnimatedD) {
      console.log("テキスト分割＆表示準備");

      // js-split-textの要素の配列に格納
      const splitTargets = document.querySelectorAll(".js-split-text");
      console.log(splitTargets);
    
      // 配列のテキストを1文字ずつspanに囲いアニメーション
      splitTargets.forEach((splitTarget) => {
        const text = splitTarget.textContent;
        const newContent = text.split('').map(char => `<span>${char}</span>`).join('');
        splitTarget.innerHTML = newContent;
        
        splitTarget.querySelectorAll('span').forEach((charSpan, charIndex) => {
          charSpan.style.opacity = 0;
          charSpan.style.transform = 'translateY(100%)';
          charSpan.style.transition = 'opacity 0.5s ease-in-out ' + charIndex * 0.1 + 's, transform 0.5s ease-in-out ' + charIndex * 0.1 + 's';
          
          setTimeout(() => {
            console.log("テキスト表示開始");
            charSpan.style.opacity = 1;
            charSpan.style.transform = 'translateY(0)';
          }, 100);
        });
      });

      const changeTimeout4 = setTimeout(() => {
        setIsAnimatedE(prev => !prev);
      }, 1400);

      return () => {
        clearTimeout(changeTimeout4);
      }
    }
  }, [isAnimatedD, setIsAnimatedE])

  // E: OUT NOW点滅開始
  useEffect(() => {
    if(isAnimatedE) {
      const changeTimeout5 = setTimeout(() => {
        console.log("OUT NOW点滅開始");
        setIsAnimatedF(prev => !prev);
      }, 1400);

      return () => {
        clearTimeout(changeTimeout5);
      }
    }
  }, [isAnimatedE, setIsAnimatedF])

  // F: ターンテーブルからアートワークに表示切り替え
  useEffect(() => {
    if(isAnimatedF) {
      const changeTimeout6 = setTimeout(() => {
        console.log("ターンテーブルからアートワークに表示切り替え");
        setIsAnimatedG(prev => !prev);
      }, 20000);

      return () => {
        clearTimeout(changeTimeout6);
      }
    }
  }, [isAnimatedF, setIsAnimatedG])

  return (
    <PromoContextPc.Provider
    value={{
      isAnimatedA,
      setIsAnimatedA,
      isAnimatedB,
      setIsAnimatedB,
      isAnimatedC,
      setIsAnimatedC,
      isAnimatedD,
      setIsAnimatedD,
      isAnimatedE,
      setIsAnimatedE,
      isAnimatedF,
      setIsAnimatedF,
      isAnimatedG,
      setIsAnimatedG
    }}>
      <Wrapper>
        <Inner className={isAnimatedC ? "left-move" : ""}> 
          {isAnimatedG ? <Artwork /> : <TurntablePc />}
          <Right className={isAnimatedD ? "active" : ""}>
            <H1>
              <SplitText className="js-split-text">Ghost Lamp</SplitText>
              <span className="small js-split-text">New Beat Album</span>
              <SplitText className="js-split-text">Slow Down</SplitText>
              <span className="small"><span className="date js-split-text">2024.04.23</span><span className="day js-split-text">(Tue)</span></span>
              <SplitText className={isAnimatedF ? "js-split-text blinking" : "js-split-text"}>Out Now</SplitText>
            </H1>
            <LinkList className={isAnimatedE ? "active" : ""}>
            {infoList.map((infoItem, index) => (
              <li key={index}>
                <a href={infoItem.href} target="_blank">
                  <img src={infoItem.imgSrc} alt={infoItem.imgAlt} />
                </a>
              </li>
            ))}
            </LinkList>
          </Right>
        </Inner>
      </Wrapper>
    </PromoContextPc.Provider>
  );
}

export default App;


