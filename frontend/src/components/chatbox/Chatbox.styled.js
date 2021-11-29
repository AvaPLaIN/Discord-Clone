import styled from 'styled-components';

export const ChatBoxComponent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;

  .controller {
    height: 5rem;
    background-color: #3b3838;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 2rem;

    .icon {
      font-size: 2rem;
      color: var(--font-color-greyed);
      cursor: pointer;
    }

    .form {
      flex: 1;

      input {
        width: 100%;
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--font-color-white);
      }
    }
  }
`;
