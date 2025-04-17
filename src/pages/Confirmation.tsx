import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTrain, FaTicketAlt, FaUser, FaEnvelope, FaPhone, FaCreditCard } from 'react-icons/fa';
import StyledButton from '../components/Button';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SuccessHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.success};
  margin-bottom: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const BookingId = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const ConfirmationMessage = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const ConfirmationCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  word-break: break-word; /* Add this to allow long emails to break */
  overflow-wrap: break-word; /* Ensure words that are too long can break */
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin: 1.5rem 0;
`;

const SeatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SeatBadge = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

interface LocationState {
  from: string;
  to: string;
  date: string;
  passengers: string;
  trainId: string;
  trainName: string;
  selectedSeats: any[];
  totalPrice: number;
  passengerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentInfo: {
    cardNumber: string;
  };
  bookingId: string;
}

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as LocationState;
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  if (!bookingData) {
    return (
      <PageContainer>
        <PageTitle>Booking Confirmation</PageTitle>
        <p>No booking information found. Please start a new booking.</p>
        <StyledButton onClick={() => navigate('/')} variant="primary">
          Return to Home
        </StyledButton>
      </PageContainer>
    );
  }
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <PageContainer>
      <SuccessHeader>
        <SuccessIcon>
          <FaCheckCircle />
        </SuccessIcon>
        <PageTitle>Booking Confirmed!</PageTitle>
        <BookingId>Booking ID: {bookingData.bookingId}</BookingId>
        <ConfirmationMessage>
          Your train tickets have been booked successfully. A confirmation email has been sent to {bookingData.passengerInfo.email}.
        </ConfirmationMessage>
      </SuccessHeader>
      
      <ConfirmationCard>
        <SectionTitle>
          <FaTrain /> Trip Details
        </SectionTitle>
        
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Train</InfoLabel>
            <InfoValue>{bookingData.trainName}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>From</InfoLabel>
            <InfoValue>{bookingData.from}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>To</InfoLabel>
            <InfoValue>{bookingData.to}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Date</InfoLabel>
            <InfoValue>{formatDate(bookingData.date)}</InfoValue>
          </InfoItem>
        </InfoGrid>
        
        <Divider />
        
        <SectionTitle>
          <FaTicketAlt /> Ticket Information
        </SectionTitle>
        
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Passengers</InfoLabel>
            <InfoValue>{bookingData.passengers}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Seats</InfoLabel>
            <SeatsList>
              {bookingData.selectedSeats.map(seat => (
                <SeatBadge key={seat.id}>{seat.id}</SeatBadge>
              ))}
            </SeatsList>
          </InfoItem>
        </InfoGrid>
        
        <Divider />
        
        <SectionTitle>
          <FaUser /> Passenger Information
        </SectionTitle>
        
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Name</InfoLabel>
            <InfoValue>{bookingData.passengerInfo.name}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{bookingData.passengerInfo.email}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>{bookingData.passengerInfo.phone}</InfoValue>
          </InfoItem>
        </InfoGrid>
        
        <Divider />
        
        <SectionTitle>
          <FaCreditCard /> Payment Information
        </SectionTitle>
        
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Payment Method</InfoLabel>
            <InfoValue>Credit Card (**** **** **** {bookingData.paymentInfo.cardNumber})</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Amount Paid</InfoLabel>
            <InfoValue>RM{bookingData.totalPrice.toFixed(2)}</InfoValue>
          </InfoItem>
        </InfoGrid>
        
        <TotalPrice>
          <span>Total:</span>
          <span>RM{bookingData.totalPrice.toFixed(2)}</span>
        </TotalPrice>
      </ConfirmationCard>
      
      <ActionButtons>
        <StyledButton onClick={() => window.print()} variant="outline">
          Print Ticket
        </StyledButton>
        
        <StyledButton onClick={() => navigate('/')} variant="primary">
          Return to Home
        </StyledButton>
      </ActionButtons>
    </PageContainer>
  );
};

export default ConfirmationPage;