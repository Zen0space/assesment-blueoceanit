import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 64px - 80px); // Adjust based on header and footer height
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 1rem 0 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorMessage>
      <StyledButton onClick={() => navigate('/')} variant="primary">
        Return to Home
      </StyledButton>
    </NotFoundContainer>
  );
};

export default NotFound;