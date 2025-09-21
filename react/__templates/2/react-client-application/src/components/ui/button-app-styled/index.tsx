import styled from "styled-components";
type ButtonStyledComponent = {
  bg?: string;
  primary?: boolean;
  padding?: string;
  rounded?: boolean;
  hoverBg?: string;
};
// Styled button component
const ButtonStyled = styled.button<ButtonStyledComponent>`
  background-color: ${(props) => props.bg || "blue"};
  color: ${(props) => (props.primary ? "white" : "black")};
  padding: ${(props) => props.padding || "10px 20px"};
  border: none;
  border-radius: ${(props) => (props.rounded ? "50px" : "5px")};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverBg || "darkblue"};
  }
`;

// Main Component
export const ButtonAppsExamples = () => {
  return (
    <div>
      {/* Default Button */}
      <ButtonStyled>Default Button</ButtonStyled>

      {/* Primary Button */}
      <ButtonStyled primary bg="green" hoverBg="darkgreen">
        Primary Button
      </ButtonStyled>

      {/* Rounded Button */}
      <ButtonStyled bg="purple" rounded padding="15px 30px">
        Rounded Button
      </ButtonStyled>
    </div>
  );
};
