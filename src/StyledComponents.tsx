import styled from 'styled-components';

const StyledButton = styled.button`
  height: 52px;
  padding: 16px;
  gap: 8px;
  border-radius: 40px;
  border: 1px solid #fff;
  font-size: 16px;
  margin-top: 1rem;
  text-transform: uppercase;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.024px;

  /* primary */
  ${(props) =>
    props.variant === 'primary' &&
    `
    width: 343px;
    color: var(--basic-white-100-main, #fff); 
    // color: ${props.theme.primary}; 
      background: none;
      @media (min-width: 768px) {
        &:hover {
            background-color: #FFF;
            color: #92A3FD;
        }
 `}

  /* secondary */
  ${(props) =>
    props.variant === 'secondary' &&
    `width: 343px;
    color: #92a3fd;
      background-color: #fff;
      @media (min-width: 768px) {
        &:hover {
            background-color: transparent;
            color: #FFF;
        }
}
`}
  /* full */
  ${(props) =>
    props.variant === 'full' &&
    `color: #fff;
    background: var(--Primary, linear-gradient(274deg, #92A3FD 0%, #9DCEFF 124.45%));

      @media (min-width: 768px) {
        &:hover {
            background-color: transparent;
            color: #FFF;
        }
}
`}
  /* full-secondary */
  ${(props) =>
    props.variant === 'full-secondary' &&
    `color: #fff;
    background: var(--Secondary, linear-gradient(274deg, #C58BF2 0%, #EEA4CE 124.45%));


      @media (min-width: 768px) {
        &:hover {
            background-color: transparent;
            color: #FFF;
        }
}
`}
`;

const StyledInput = styled.input`
  height: 56px;
  margin: 1vh;
  justify-content: center;
  align-items: center;

  border-radius: 15px;
  border: none;
  background: var(--neutrals-50, #f2f4f7);

  text-indent: 10px;

  &::placeholder {
    font-size: 16px;
  }
`;

{
  /* <h3 className="what-services-title">What services do you offer?</h3>
        <p className="what-services-paragraph">
          <small>
            List your services to help your clients book exactly what they need
          </small>
        </p> */
}

const StyledH3 = styled.h3`
  font-family: Poppins;
  font-weight: 900;
  /* line-height: 48px; */
  letter-spacing: 0.25px;
`;
const StyledSmallP = styled.p`
  /* margin: 0px 16px 32px 16px; */
  font-family: Poppins;
  font-weight: 100;
`;

export { StyledButton, StyledInput, StyledH3, StyledSmallP };
