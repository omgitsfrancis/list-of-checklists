import React from "react";
import styled from 'styled-components';

const StyledSideNav = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 300px;
    overflow-y: auto;
    border-right: solid 4px #616161;
`
export default function SideNav(props) {
    return (
        <StyledSideNav>
            {props.children}
        </StyledSideNav>
    )
}