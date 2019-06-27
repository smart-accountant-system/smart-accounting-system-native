import styled from 'styled-components';

export default styled.TouchableOpacity`
  background-color: ${props =>
    props.debit > props.credit ? '#5dba89' : '#e0aac6'};
`;
