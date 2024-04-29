import { createContext, useState, useEffect } from 'react';
export const PromoContextSp = createContext();
import styled from "styled-components";
import TurntableSp from './TurntableSp';
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
  margin-inline: auto;
  padding: 0 10vw;
  width: 80vw;
`;

const Right = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const H1 = styled.h1`
  word-break: keep-all;
  color: rgba(255, 255, 255, 0);
  text-align: center;
  font-size: 1.625rem;
  .small {
    display: block;
    margin-top: 6vw;
    font-weight: 400;
    font-size: 0.875rem;
    &.sp {
      margin-top: 0;
    }
  }
  .date {
    font-size: 1rem;
    display: inline-block;
    margin-right: 0.25vw;
    letter-spacing: 0.02em;
  }
  .day {
    font-size: 0.875rem;
  }
  &.active {
    color: white;
  }
`;

const Main = styled.div`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 74vw;
  opacity: 1 !important;
  transition: height 1s ease-in-out;
  &.height-large {
    height: 90vw;
  }
`;

const LinkList = styled.ul`
  display: grid;
  grid-template-columns: 26vw 21vw 25vw;
  place-items: center;
  gap: 3vw;
  margin-top: 4vw;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.active {
    opacity: 1;
  }
  a {
    display: inline-block;
  }
  img {
    width: 100%;
  }
`;

const SplitText = styled.span`
  display: block;
  text-align: center;
  &.blinking {
    color: #cf1313;
    animation: blinking 1.5s ease-in-out infinite;
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
    href: "https://www.amazon.co.jp/music/player/albums/B0CZ7P5V1T?&_encoding=UTF8&tag=tcjaz-22&linkCode=ur2&camp=247&creative=1211",
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
  
  // B: 2.6秒後にテキストが非表示で存在
  useEffect(() => {
    if(isAnimatedB) {
      const changeTimeout2 = setTimeout(() => {
        setIsAnimatedC(prev => !prev);
      }, 2600);

      return () => {
        clearTimeout(changeTimeout2);
      }
    }
  }, [isAnimatedB, setIsAnimatedC]);

  // C: テキスト分割＆表示開始
  useEffect(() => {
    if(isAnimatedC) {
      // js-split-textの要素の配列に格納
      const splitTargets = document.querySelectorAll(".js-split-text");
    
      // 配列のテキストを1文字ずつspanに囲いアニメーション
      splitTargets.forEach((splitTarget) => {
        const text = splitTarget.textContent;
        const newContent = text.split('').map(char => `<span>${char}</span>`).join('');
        splitTarget.innerHTML = newContent;
        
        splitTarget.querySelectorAll('span').forEach((charSpan, charIndex) => {
          charSpan.style.opacity = 0;
          charSpan.style.transform = 'translateY(100%)';
          charSpan.style.transition = 'opacity 0.5s ease-in-out ' + charIndex * 0.2 + 's, transform 0.5s ease-in-out ' + charIndex * 0.2 + 's';
          
          setTimeout(() => {
            charSpan.style.opacity = 1;
            charSpan.style.transform = 'translateY(0)';
          }, 100);
        });
      });

      const changeTimeout3 = setTimeout(() => {
        setIsAnimatedD(prev => !prev);
      }, 2000);

      return () => {
        clearTimeout(changeTimeout3);
      }
    }
  }, [isAnimatedC, setIsAnimatedD])

  // D: OUT NOW点滅開始
  useEffect(() => {
    if(isAnimatedD) {
      const changeTimeout4 = setTimeout(() => {
        setIsAnimatedE(prev => !prev);
      }, 1600);

      return () => {
        clearTimeout(changeTimeout4);
      }
    }
  }, [isAnimatedD, setIsAnimatedE])

  // E: ターンテーブル上下の余白広がる
  useEffect(() => {
    if(isAnimatedE) {
      const changeTimeout5 = setTimeout(() => {
        setIsAnimatedF(prev => !prev);
      }, 21000);

      return () => {
        clearTimeout(changeTimeout5);
      }
    }
  }, [isAnimatedE, setIsAnimatedF])

  // F: ターンテーブルからアートワークに表示切り替え
  useEffect(() => {
    if(isAnimatedF) {
      const changeTimeout6 = setTimeout(() => {
        setIsAnimatedG(prev => !prev);
      }, 1000);

      return () => {
        clearTimeout(changeTimeout6);
      }
    }
  }, [isAnimatedF, setIsAnimatedG])
  
  return (
    <PromoContextSp.Provider
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
        <Inner> 
          <Right>
            <H1 className={isAnimatedC ? "active" : ""}>
              <SplitText className="js-split-text">Ghost Lamp</SplitText>
              <span className="small js-split-text">New Beat Album</span>
              <SplitText className="js-split-text">Slow Down</SplitText>
              <Main className={isAnimatedF ? "height-large" : ""}>
                {isAnimatedG ? <Artwork /> : <TurntableSp />}
              </Main>
              <span className="small sp"><span className="date js-split-text">2024.04.23</span><span className="date day js-split-text">（Tue）</span></span>
              <SplitText className={isAnimatedE ? "js-split-text blinking" : "js-split-text"}>Out Now</SplitText>
            </H1>
            <LinkList className={isAnimatedD ? "active" : ""}>
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
    </PromoContextSp.Provider>
  );
}

export default App;
