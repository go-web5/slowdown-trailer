import { useEffect, useContext } from 'react';
import { PromoContext } from "./App";
import styled from "styled-components";
import Turntable from './Turntable';
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
  }
  @keyframes left-move {
    0% {
      width: 720px;
    }
    100% {
      width: 1560px;
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

// const BGR = styled.div`
//   position: absolute;
//   bottom: -148px;
//   right: 50%;
//   transform: translateX(50%);
//   width: 136px;
//   height: 133px;
//   img {
//     width: 100%;
//   }
// `;

const H1 = styled.h1`
  word-break: keep-all;
  color: white;
  text-align: center;
  font-size: 5rem;
  .small {
    display: block;
    margin-top: 60px;
    font-weight: 400;
    font-size: 2.25rem;
  }
  .date {
    font-size: 2.8rem;
    display: inline-block;
    margin-right: 10px;
    letter-spacing: 0.1em;
  }
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 60px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  a {
    display: inline-block;
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
    href: "https://www.amazon.co.jp/music/player?&_encoding=UTF8&tag=tcjaz-22&linkCode=ur2&camp=247&creative=1211",
    imgSrc: amazon,
    imgAlt: "amazon music"
  },
]

function App() {
  const {isAnimatedB, isAnimatedC, setIsAnimatedC, isAnimatedD, setIsAnimatedD, isAnimatedE, setIsAnimatedE, isAnimatedF, setIsAnimatedF, isAnimatedG, setIsAnimatedG } = useContext(PromoContext);
  
  // B
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

  // C
  useEffect(() => {
    if(isAnimatedC) {
      console.log("2秒後にテキスト表示");
      const changeTimeout3 = setTimeout(() => {
        setIsAnimatedD(prev => !prev);
      }, 3000);

      return () => {
        clearTimeout(changeTimeout3);
      }
    }
  }, [isAnimatedC, setIsAnimatedD])

  // D
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

  // E
  useEffect(() => {
    if(isAnimatedE) {
      const changeTimeout5 = setTimeout(() => {
        console.log("点滅開始");
        setIsAnimatedF(prev => !prev);
      }, 1400);

      return () => {
        clearTimeout(changeTimeout5);
      }
    }
  }, [isAnimatedE, setIsAnimatedF])

  // F
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
    <Wrapper>
      <Inner className={isAnimatedC ? "left-move" : ""}> 
        {isAnimatedG ? <Artwork /> : <Turntable />}
        <Right className={isAnimatedD ? "active" : ""}>
          <H1>
            <SplitText className="js-split-text">Ghost Lamp</SplitText>
            <span className="small js-split-text">New Beat Album</span>
            <SplitText className="js-split-text">Slow Down</SplitText>
            <span className="small"><span className="date js-split-text">2024.04.23</span><span className="date js-split-text"> (Tue)</span></span>
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
          {/* <BGR>
            <img src={bgrLogo} alt="Bold Gamble Records" />
          </BGR> */}
        </Right>
      </Inner>
    </Wrapper>
  );
}

export default App;


