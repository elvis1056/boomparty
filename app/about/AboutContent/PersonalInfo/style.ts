import { css } from 'styled-components';

export default css`
  height: 100%;
  min-height: 650px;
  position: relative;

  .personal-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;

    &:after {
      content: '';
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      opacity: 0.7;
      backdrop-filter: blur(2px);
    }
  }

  .personal-section-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    min-height: 650px;
    display: flex;
    flex-direction: row;

    .personal-spacer {
      flex-basis: 8.333%; /* basis-1/12 */
    }

    .personal-main {
      flex-basis: 83.333%; /* basis-10/12 */
      min-height: 650px;
      display: flex;
      flex-direction: column;
      padding-top: 0;
      padding-bottom: 0;
      color: white;

      @media (min-width: 768px) {
        flex-direction: row;
        padding-top: 3rem;
        padding-bottom: 2rem;
      }

      .personal-left {
        flex-basis: 41.666%; /* basis-5/12 */
        padding: 3rem;
        background: rgba(23, 20, 20, 0.58);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px solid #fff;
        border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;

        h1 {
          font-size: 32px;
          margin: 0;
        }

        h4 {
          font-size: 16px;
          margin: 0;
        }

        h6 {
          font-size: 12px;
          margin: 0;
        }

        .personal-description {
          display: flex;
          flex-direction: column;
          flex-grow: 1;

          ul {
            list-style: none;
            padding: 0;
            margin-top: 1rem;
            border-top: 1px solid #afafaf;
            padding-top: 1rem;

            & > li {
              margin-top: 0.5rem;
            }

            .personal-description-text-block {
              display: flex;
              list-style: none;
              padding: 0;

              & > :nth-child(1) {
                flex: 1;
              }

              & > :nth-child(2) {
                flex: 3;
              }

              li {
                margin: 0;
              }
            }
          }
        }
      }

      .personal-right {
        flex-basis: 58.333%; /* basis-7/12 */
        padding: 1rem;
        background: rgba(23, 20, 20, 0.58);
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;
        border-right: 2px solid #fff;

        @media (min-width: 768px) {
          padding: 3rem;
        }

        .personal-image-wrapper {
          display: flex;
          flex-grow: 1;

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .personal-bg {
      min-height: 300px;
    }

    .personal-section-wrapper {
      min-height: 300px;

      .personal-main {
        min-height: 300px;

        .personal-left {
          border-bottom: 0;
          border: none;
          height: 100%;

          .personal-description {
            text-align: center;
          }
        }

        .personal-right {
          border-top: 0;
          border: none;

          .personal-image-wrapper {
            display: flex;
            justify-content: center;

            img {
              width: 80%;
            }
          }
        }
      }
    }
  }
`;
