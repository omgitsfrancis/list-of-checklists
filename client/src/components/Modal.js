import React from "react";
import styled from "styled-components";
import { PrimaryButton, DangerButton } from "./Buttons";

const Backdrop = styled.div`
  display: 1;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: auto;
  width: 25%;
  padding: 20px;
  border: 1px solid #888;
`;

const ModalTitle = styled.h1`
  line-height: 0;
  margin-bottom: 2rem;
  font-size: 24px;
`;

const ModalText = styled.p`
  line-height: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  > button {
    margin-left: 0.5rem;
  }
`;

export function ConfirmationModal(props) {
  const { showModal, title, text, onYesClick, onNoClick, ...rest } = props;

  return (
    <>
      {showModal && (
        <Backdrop>
          <ModalContainer>
            <ModalTitle>{title}</ModalTitle>
            <ModalText>{text}</ModalText>
            <ButtonContainer>
              <DangerButton onClick={onYesClick}>Yes</DangerButton>
              <PrimaryButton onClick={onNoClick}>No</PrimaryButton>
            </ButtonContainer>
          </ModalContainer>
        </Backdrop>
      )}
    </>
  );
}
