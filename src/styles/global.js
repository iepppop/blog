import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
  const theme = useTheme();

  const style = css`
    @font-face {
      font-family: 'Pretendard';
      src: url('../../node_modules/pretendard/dist/public/static/Pretendard-Regular.otf') format('otf');
      font-weight: normal;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Pretendard', sans-serif;
    }

    body {
      font-size: 16px;
      color: ${theme.colors.text};
      overflow:auto;
      height:100vh;
      width:100%;
      background: ${theme.colors.background};
    }

    select,
    input,
    button,
    textarea {
      border: 0;
      outline: 0 !important;
      box-shadow: none;
      font-size: 16px;
      background:none;
    }

    button{
      cursor:pointer;
    }

    a {
      color:  ${theme.colors.text};
      text-decoration: none;
    }

    #root{
      height:100%;
    }
  `;

  return <Global styles={style} />;
};

export default GlobalStyle;