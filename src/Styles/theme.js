import { css } from "styled-components";

const centerSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const columnCenter = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const justifyCenter = css`
  display: flex;
  justify-content: center;
`;

const startSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const full = css`
  width: 100%;
  height: 100%;
`;

const theme = {
  borderGray: "#cccccc",
  fontBlue: "#4477BE",
  fontGray: "#5F5F5F",
  center,
  centerSpaceBetween,
  justifyCenter,
  startSpaceBetween,
  columnCenter,
  full,
};

export default theme;
