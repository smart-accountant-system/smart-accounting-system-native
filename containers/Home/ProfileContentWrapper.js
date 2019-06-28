import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border-color: ${props => props.color || '#000'};
  border-width: 5px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AvatarPicture = styled.ImageBackground`
  width: 200px;
  height: 200px;
`;

export const AvatarTypography = styled.Text`
  color: ${props => props.color || '#000'};
  font-size: ${props => props.size || '50px'};
  font-weight: ${({ text }) => (text ? 400 : 500)};
  padding-bottom: ${({ text }) => (text ? 16 : 0)}px;
`;

export const InforWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;

  border-top-width: 12px;
  border-top-color: #f1f1f1;

  padding-left: ${({ noPaddingLeft }) => (noPaddingLeft ? 0 : 16)}px;
`;
