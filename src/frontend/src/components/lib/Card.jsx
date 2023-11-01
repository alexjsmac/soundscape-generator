import styled from "styled-components";

export default styled.div`
  margin: ${(props) => (props.spaceAround ? "1rem 1rem" : "0")};
  margin-bottom: ${(props) => (props.mb ? "1rem" : "0")};
  padding: 1px;
  overflow: hidden;
  box-shadow: 0 0 0 1px ${(props) => props.theme.color.borderOne} inset;
`;
