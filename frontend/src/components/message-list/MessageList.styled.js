import styled from 'styled-components';

export const MessageListComponent = styled.div`
  max-height: calc(100vh - 12rem);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0 0 2rem 0;
  gap: 1rem;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
