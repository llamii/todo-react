import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;

    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.font};

    h1, h2, h3, h4, h5, h6, span, button, input {
      color: ${(props) => props.theme.colors.font}
    }

    a {
      cursor: pointer;
      color: ${(props) => props.theme.colors.font};
      text-decoration: none;
    }

  }

  *:focus {
    outline: none;
}
`;
