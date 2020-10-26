import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }

    a {
        margin: 0;
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    input {
        border:none;
        vertical-align: middle;
    }

    input:focus {
        outline: none;
    }

    textarea:focus {
        outline: none;
    }

    button {
        border: 0;
        background: none;
        
        &:focus {
            outline: none;
        }
    }
`;

export default GlobalStyles;
