import styled from 'styled-components';

export const RoomItemComponent = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;

  .icon {
    font-size: 1.6rem;
    color: var(--font-color-greyed);
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--font-color-greyed);
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    background-color: #363333;

    h1 {
      color: var(--font-color-white);
    }
  }
`;
