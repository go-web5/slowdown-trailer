import { useState, useEffect } from 'react';
import styled from "styled-components";
import Turntable from './Turntable';
import Artwork from './Artwork';
// import './App.css';

// 画像読み込み
// import artwork from "/src/assets/slowdown_artwork.png"
import apple from "/src/assets/apple-music-logo.png"
import spotify from "/src/assets/spotify-logo.png"
import amazon from "/src/assets/amazon-logo.png"
// import bgrLogo from "/src/assets/bgr-logo.png"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Inner = styled.div`
  margin-inline: auto;
  padding: 0 10vw;
  width: 80vw;
`;

// const Artwork = styled.div`
//   margin-top: 4vw;
//   width: 100%;
//   a {
//     display: block;
//   }
//   img {
//     width: 100%;
//     max-width: 100%;
//     height: auto;
//     vertical-align: bottom;
//   }
// `;

const Right = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const BGR = styled.div`
//   position: absolute;
//   bottom: -20vw;
//   right: 50%;
//   transform: translateX(50%);
//   width: 15vw;
//   height: 14.5vw;
//   img {
//     width: 100%;
//   }
// `;

const H1 = styled.h1`
  word-break: keep-all;
  color: white;
  text-align: center;
  font-size: 1.625rem;
  .small {
    display: block;
    margin-top: 6vw;
    font-weight: 400;
    font-size: 0.875rem;
  }
  .date {
    font-size: 1rem;
    display: inline-block;
    margin-right: 0.25vw;
    letter-spacing: 0.02em;
  }
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  margin-top: 4vw;
  .apple {
    width: 26vw;
  }
  .spotify {
    width: 21vw;
  }
  .amazon {
    width: 25vw;
  }
  a {
    display: inline-block;
  }
  img {
    width: 100%;
  }
`;

const infoList = [
  {
    href: "https://music.apple.com/jp/album/1738276723?mt=1&app=music&at=10l7qr",
    imgSrc: apple,
    imgAlt: "Listen on Apple Music",
    className: "apple"
  },
  {
    href: "https://open.spotify.com/intl-ja/album/2JBmHmExVpG5MpIO3xfVa4",
    imgSrc: spotify,
    imgAlt: "Spotify",
    className: "spotify"
  },
  {
    href: "https://www.amazon.co.jp/music/player?&_encoding=UTF8&tag=tcjaz-22&linkCode=ur2&camp=247&creative=1211",
    imgSrc: amazon,
    imgAlt: "amazon music",
    className: "amazon"
  },
]

function App() {
  const [trigger, setTrigger] = useState(false);
  
  const Change = () => {
    setTrigger(prev => !prev);
  }
  
  useEffect(() => {
    if (trigger) {
      const chageTimeout = setTimeout(() => {
        Change();
      }, 30000);
      
      return () => {
        clearTimeout(chageTimeout);
      }
    } 
  }, [trigger]);
  
  const ChangeArtwork = () => {
    if (trigger) {
      return <Turntable />
    }
    return <Artwork />
  }

  return (
    <Wrapper>
      <Inner> 
        <Right>
          <H1>
            Ghost Lamp<wbr/>
            <span className="small">New Beat Album</span>
            Slow Down<wbr/>
            {/* <Artwork>
              <a href="https://linkco.re/xq9Xv6Ne" target="_blank">
                <img src={artwork}/>
              </a>
            </Artwork> */}
            <ChangeArtwork/>
            <span className="small"><span className="date">2024.04.23</span> (Tue)</span>
            Out Now
          </H1>
          <LinkList>
          {infoList.map((infoItem, index) => (
            <li key={index}>
              <a href={infoItem.href} target="_blank" className={infoItem.className}>
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
