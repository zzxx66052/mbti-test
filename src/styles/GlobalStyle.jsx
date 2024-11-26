import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
      //색상,폰트 정의하기
      --nav--color: #FFDDAE;
      --button--color: #C6E7FF;
      --hover--color: #D4F6FF;
      --border--color: #FBFBFB;
  }

  * {
    // box sizing 리셋하기
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
