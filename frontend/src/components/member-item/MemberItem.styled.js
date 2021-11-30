import styled from 'styled-components';

export const MemberItemComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  width: 100%;

  .icon {
    font-size: 1.6rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 2px solid var(--font-color-greyed);
    color: var(--font-color-greyed);
    padding: 0.5rem;
  }

  h1 {
    width: 100%;
    font-size: 1.8rem;
    color: var(--font-color-greyed);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    .icon,
    h1 {
      color: var(--font-color-white);
    }
  }
`;
