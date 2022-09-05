import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  > section {
    :not(:nth-child(1)) {
      margin-top: 20px;
    }
    :nth-last-child(2) {
      margin-bottom: 40px;
    }
  }
`;

const InputSectionContainer = styled.section`
  > header {
    font-size: 1rem;
    font-weight: 700;
  }
`;

interface InputFormProps {
  children?: React.ReactNode;
}

interface InputSectionProps {
  children?: React.ReactNode;
  header: string;
}

const Section = ({ children, header }: InputSectionProps) => {
  return (
    <InputSectionContainer>
      <header>{header}</header>
      {children}
    </InputSectionContainer>
  );
};

const InputForm = ({ children }: InputFormProps) => {
  return <FormContainer>{children}</FormContainer>;
};

export { Section };
export default InputForm;
