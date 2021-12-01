import styled from 'styled-components';

export const MessageListComponent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  overflow-y: auto;
  padding: 0.5rem 1rem;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
