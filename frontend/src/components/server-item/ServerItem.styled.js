import styled from 'styled-components';

export const ServerItemComponent = styled.div`
  max-width: 50px;
  min-width: 50px;
  min-height: 50px;
  max-height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: #5865f2;
  /* background-color: ${(props) => props.backgroundColor}; */
  padding: 1rem;
  transition: all 0.1s ease-in;

  .server-icon {
    color: #000000;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .description {
    font-size: 2rem;
    color: #e6e0e0;
    position: absolute;
    left: 72px;
    width: max-content;
    max-width: 20rem;
    background-color: #1a1818;
    padding: 1rem;
    display: none;
    border-radius: 0.6rem;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-right: 14px solid #1a1818;
      border-bottom: 10px solid transparent;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: -11px;
    width: 4px;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    height: 20px;
    background-color: #d8d0d0;
    display: none;
  }

  &:hover {
    border-radius: 40%;

    .description {
      display: flex;
    }

    &::before {
      display: flex;
    }
  }
`;
