import styled from 'styled-components/native';

export default styled.View`
  position: absolute;
  background-color: ${props => props.backgroundColor};
  height: 90px;
  width: 90px;
  border-radius: 45px;
  bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
