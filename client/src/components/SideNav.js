import React from "react";
import styled from 'styled-components';

const StyledSideNav = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 300px;
    overflow-y: auto;

`
export default function SideNav(props) {
    return (
        <StyledSideNav>
            {props.children}
        </StyledSideNav>
    )
}