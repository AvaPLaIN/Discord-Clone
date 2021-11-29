import styled from 'styled-components';

export const RoomDetailsComponent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #333030;

  .header {
    height: 5rem;
    border-bottom: 1px solid #1a1818;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;

    .room-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      min-width: 15rem;
      max-width: 30rem;
      flex: 1;

      .icon {
        font-size: 1.8rem;
        color: var(--font-color-greyed);
      }

      h1 {
        width: 100%;
        font-size: 2rem;
        font-weight: 500;
        color: var(--font-color-greyed);
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .room-settings {
      display: flex;
      align-items: center;
      gap: 2.5rem;

      .search {
        display: flex;
        align-items: center;
        position: relative;

        input {
          width: 17rem;
          border-radius: 1rem;
          border: none;
          background-color: #1a1818;
          color: var(--font-color-greyed);
          padding: 0.2rem 3rem 0.2rem 1rem;
          outline: none;
        }

        .icon {
          position: absolute;
          right: 1rem;
          font-size: 1.4rem;
        }
      }

      .icon {
        font-size: 1.8rem;
        color: var(--font-color-greyed);
      }
    }
  }

  .room-ui {
    display: flex;
    flex: 1;
  }
`;
