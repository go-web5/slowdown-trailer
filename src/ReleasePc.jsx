import { createContext, useState, useEffect } from 'react';
import { mediaQuery, useMediaQuery } from './useMediaQuery';
import styled from "styled-components";
import TurntablePc from './TurntablePc';
import Artwork from './Artwork';

// 画像読み込み
import apple from "/src/assets/apple-music-logo.png";
import spotify from "/src/assets/spotify-logo.png";
import amazon from "/src/assets/amazon-logo.png";

export const PromoContextPc = createContext();

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-x: hidden;
  @media screen and (max-width: 768px) {
    
  }
`;

const Inner = styled.div`
  display: flex;
  gap: 156px;   
  width: 720px;
  margin-inline: auto;
  padding: 0 48px;
  @media screen and (max-width: 1656px) {
    width: 43.4782609vw;
    gap: 7vw;
    padding: 0 6vw;
  }
  @media screen and (max-width: 768px) {
    display: block;
    gap: normal;
    width: 80vw;
    padding: 0 10vw;
  }
  &.left-move {
    animation: left-move 3s ease-in-out forwards;
    @media screen and (max-width: 1656px) {
      animation: left-move-tab 3s ease-in-out forwards;
    }
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
  @media screen and (max-width: 768px) {
    color: rgba(255, 255, 255, 0);
    font-size: 1.625rem;
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
    @media screen and (max-width: 768px) {
      margin-top: 6vw;
      font-size: 0.875rem;
    }
    &.sp {
      margin-top: 0;
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
    @media screen and (max-width: 768px) {
      margin-right: 0.25vw;
      font-size: 1rem;
      letter-spacing: 0.02em;
    }
  }
  .day {
    display: inline-block;
    letter-spacing: 0.1em;
    @media screen and (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
  &.active {
    color: white;
  }
`;

const Main = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 74vw;
    opacity: 1 !important;
    transition: height 1s ease-in-out;
  }
  &.height-large {
    height: 90vw;
  }
`;

const LinkList = styled.ul`
  display: grid;
  grid-template-columns: 208px 152px 208px;
  place-items: center;
  gap: 40px;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  @media screen and (max-width: 1656px) {
    grid-template-columns: 12.56vw 9.18vw 12.56vw;
    gap: 2.42vw;
    margin-top: 3.62vw;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 26vw 21vw 25vw;
    gap: 3vw;
    margin-top: 4vw;
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
    @media screen and (max-width: 768px) {
      animation-duration: 1.5s;
    }
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
  const [isAnimated, setIsAnimated] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false
  });
  const isSp = useMediaQuery(mediaQuery.sp);

  // B
  useEffect(() => {
    // SP以外: 3秒後にターンテーブルが左に移動開始
    // SP: 2.6秒後にテキストが非表示で存在
    if(isAnimated.b) {
      const timeoutDuration = isSp ? 2600 : 3000;
      const changeTimeout2 = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, c: !prev.c }));
      }, timeoutDuration);

      return () => {
        clearTimeout(changeTimeout2);
      }
    }
  }, [isAnimated.b, setIsAnimated, isSp]);

  // C
  useEffect(() => {
    // SP以外: 3秒後に右側のテキストエリア非表示で存在
    // SP: テキスト分割＆表示開始、2秒後に isAnimated.d がtrue

    if(isAnimated.c) {
      const timeoutDuration = isSp ? 2000 : 3000;

      // SP テキスト分割＆表示開始
      if (isSp) {
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
      }

      const changeTimeout3 = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, d: !prev.d }));
      }, timeoutDuration);

      return () => {
        clearTimeout(changeTimeout3);
      }
    }
  }, [isAnimated.c, setIsAnimated, isSp])

  // D
  useEffect(() => {
    // SP以外: テキスト分割＆右側に表示開始、1.4秒後にisAnimated.e がtrue
    // SP: 1.6秒後に OUT NOW点滅開始
    
    if(isAnimated.d) {
      const timeoutDuration = isSp ? 1600 : 1400;

      // SP以外 テキスト分割＆表示開始
      if(!isSp) {
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
            charSpan.style.transition = 'opacity 0.5s ease-in-out ' + charIndex * 0.1 + 's, transform 0.5s ease-in-out ' + charIndex * 0.1 + 's';
            
            setTimeout(() => {
              charSpan.style.opacity = 1;
              charSpan.style.transform = 'translateY(0)';
            }, 100);
          });
        });
      }
  
      const changeTimeout4 = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, e: !prev.e }));
      }, timeoutDuration);

      return () => {
        clearTimeout(changeTimeout4);
      }
    }
  }, [isAnimated.d, setIsAnimated, isSp])

  // E
  useEffect(() => {
    // SP以外: 1.4秒後に OUT NOW点滅開始
    // SP: 21秒後にターンテーブル上下の余白広がる
    if(isAnimated.e) {
      const timeoutDuration = isSp ? 21000 : 1400;

      const changeTimeout5 = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, f: !prev.f }));
      }, timeoutDuration);

      return () => {
        clearTimeout(changeTimeout5);
      }
    }
  }, [isAnimated.e, setIsAnimated, isSp])

  // F
  useEffect(() => {
    // SP以外: 20秒後にターンテーブルからアートワークに表示切り替え
    // SP: 1秒後にターンテーブルからアートワークに表示切り替え
    if(isAnimated.f) {
      const timeoutDuration = isSp ? 1000 : 20000;

      const changeTimeout6 = setTimeout(() => {
        setIsAnimated(prev => ({ ...prev, g: !prev.g }));
      }, timeoutDuration);

      return () => {
        clearTimeout(changeTimeout6);
      }
    }
  }, [isAnimated.f, setIsAnimated, isSp])

  return (
    <PromoContextPc.Provider
    value={{ isAnimated, setIsAnimated }}>
      <Wrapper>
        <Inner className={!isSp && isAnimated.c ? "left-move" : ""}>

          {/* スマホの場合はnullを返す。スマホ以外の場合、gの真偽値が trueなら Artworkを表示、falseなら TurntablePcを表示 */}
          {/* {isSp ? null :
            (isAnimated.g ? <Artwork /> : <TurntablePc />)
          } */}

          {/* スマホ以外の場合、gの真偽値が trueなら Artworkを表示、falseなら TurntablePcを表示 */}
          {!isSp &&
            isAnimated.g ? <Artwork /> : <TurntablePc />
          }

          <Right className={isSp ? "active" : isAnimated.d ? "active" : ""}>
            <H1 className={isAnimated.c ? "active" : ""}>
              <SplitText className="js-split-text">Ghost Lamp</SplitText>
              <span className="small js-split-text">New Beat Album</span>
              <SplitText className="js-split-text">Slow Down</SplitText>
              {/* スマホの場合、Mainを表示してgの真偽値が trueなら Artworkを表示、falseなら TurntablePcを表示 */}
              {isSp &&
                <Main className={isAnimated.f ? "height-large" : ""}>
                  {isAnimated.g ? <Artwork /> : <TurntablePc />}
                </Main>
              }
              <span className={isSp ? "small sp" : "small" }><span className="date js-split-text">2024.04.23</span><span className="day js-split-text">(Tue)</span></span>
              <SplitText className={isAnimated.f ? "js-split-text blinking" : "js-split-text"}>Out Now</SplitText>
            </H1>
            <LinkList className={isAnimated.e ? "active" : ""}>
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


