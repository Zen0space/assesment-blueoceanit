import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} TrainTicket Booking. All rights reserved.
        </Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;