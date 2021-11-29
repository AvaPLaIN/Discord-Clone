import styled from 'styled-components';

export const MessageItemComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  .details {
    display: flex;
    align-items: center;
    gap: 2rem;

    h1 {
      font-size: 1.6rem;
      color: var(--font-color-white);
      cursor: pointer;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid var(--font-color-white);
      }
    }

    p {
      color: var(--font-color-greyed);
      font-size: 1.2rem;
    }
  }

  p {
    color: var(--font-color-white);
    font-size: 1.6rem;
  }
`;
