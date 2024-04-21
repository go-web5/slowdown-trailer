import styled from "styled-components";

// 画像読み込み
import artwork from "/src/assets/slowdown_artwork.png";

const ArtworkComponent = styled.div`
  width: 720px;
  @media screen and (max-width: 768px) {
    margin-top: 4vw;
    width: 100%;
  }
  a {
    display: block;
  }
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    vertical-align: bottom;

  }
`;

function Artwork() {
  return (
    <ArtworkComponent>
      <a href="https://linkco.re/xq9Xv6Ne" target="_blank">
        <img src={artwork}/>
      </a>
    </ArtworkComponent>
  );
}

export default Artwork;
