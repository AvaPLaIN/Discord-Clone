import styled from 'styled-components';

export const MessageListComponent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
