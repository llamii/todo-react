import { createGlobalStyle } from 'styled-components';

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
  }
`;
