import styled from 'styled-components';

export const RoomListComponent = styled.div`
  width: clamp(250px, 250px, 250px);
  background-color: #292626;
  display: flex;
  flex-direction: column;

  .room-header {
    height: 5rem;
    border-bottom: 1px solid #1a1818;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--font-color-white);
    padding: 1rem 2rem;
    cursor: pointer;
    gap: 1rem;

    .certificate {
      position: relative;

      .icon {
        color: black;
      }

      p {
        font-size: 1rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        color: white;
      }
    }

    h1 {
      font-size: 1.8rem;
      font-weight: 500;
      color: var(--font-color-white);
      text-overflow: ellipsis;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }

    .icon {
      font-size: 2rem;
      color: var(--font-color-white);
    }

    &:hover {
      background-color: #363333;
    }
  }

  .room-list {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-top: 1rem;

    .create {
      width: 100%;

      button {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--font-color-greyed);
        cursor: pointer;

        &:hover {
          color: var(--font-color-white);
        }
      }
    }
  }

  .profile {
    width: 100%;
    height: 5rem;
    background-color: #1f1d1d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;

    .info {
      flex: 1;
      max-width: 60%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;

      h2 {
        width: 100%;
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--font-color-white);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      p {
        font-size: 1rem;
        color: #5f5c5c;
      }
    }

    .settings {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 0 1rem;

      .icon {
        cursor: pointer;
        color: #9c9494;
        font-size: 1.4rem;
      }
    }
  }

  .add {
    display: ${(props) => (props?.isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: center;

    .container {
      width: 50rem;
      height: 30rem;
      border-radius: 1rem;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        align-self: flex-end;

        button {
          padding: 1rem;
          cursor: pointer;
          outline: none;
          border: none;
          background-color: transparent;
          color: var(--font-color-white);
        }
      }

      .create-room {
        margin-top: 5rem;
        align-self: flex-start;
        display: flex;
        align-items: center;

        input {
          width: 37rem;
          border-bottom-left-radius: 1rem;
          border-top-left-radius: 1rem;
          border: none;
          background-color: #2e2a2a;
          color: var(--font-color-greyed);
          padding: 1.5rem 1rem;
          outline: none;
        }

        button {
          width: 9rem;
          padding: 1.5rem 1rem;
          background-color: #2e2a2a;
          color: var(--font-color-greyed);
          border: none;
          border-left: 1px solid black;
          cursor: pointer;

          &:hover {
            color: var(--font-color-white);
          }
        }
      }
    }
  }
`;
