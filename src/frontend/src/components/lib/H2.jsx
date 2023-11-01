import styled from "styled-components";

export default styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: ${(props) => (props.mb ? "0.6rem" : 0)};
`;
