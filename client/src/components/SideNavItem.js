import React from "react";
import styled from "styled-components";

const StyledSideNavItem = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: white;
background: ${props => props.isSelected && 'rgba(0,0,0,.08)'};
:hover {
    background: rgba(0,0,0,.04);
    cursor: pointer;
}
`;

const StyledText = styled.span`
  display: block;
  color: #616161;
  font-size: 1.25rem;
  padding: 1rem 4rem;
  user-select: none;
`;

export default function SideNavItem(props) {
  const { text, onClick, id, children, isSelected } = props;

  return (
    <StyledSideNavItem onClick={onClick} id={id} isSelected={isSelected}>
      {text && <StyledText>{text}</StyledText>}
      {children}
    </StyledSideNavItem>
  );
}
