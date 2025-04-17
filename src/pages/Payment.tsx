import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrain, FaSubway, FaChair, FaCreditCard, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import StyledButton from '../components/Button';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PaymentFormContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

const OrderSummaryContainer = styled.div`
  flex: 0 0 350px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const SummarySection = styled.div`
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const SummaryLabel = styled.span`
  font-weight: 500;
`;

const SummaryValue = styled.span``;

const SummaryDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin: 1rem 0;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  margin-top: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

interface LocationState {
  arrivalTime: string;
  departureTime: string;
  trainNumber: string;
  from: string;
  to: string;
  date: string;
  passengers: string;
  trainId: string;
  coachId: string;
  trainName: string;
  selectedSeats: any[];
  totalPrice: number;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<LocationState | null>(
    location.state as LocationState
  );
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate the form and process payment
    
    // Navigate to confirmation page
    navigate('/confirmation', {
      state: {
        ...bookingData,
        passengerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
        paymentInfo: {
          cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
        },
        bookingId: `BK${Math.floor(Math.random() * 1000000)}`,
      }
    });
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (!bookingData) {
    return (
      <PageContainer>
        <PageTitle>Payment</PageTitle>
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
      <PageTitle>Payment Details</PageTitle>
      
      <PaymentContainer>
        <PaymentFormContainer>
          <FormTitle>Enter Your Details</FormTitle>
          
          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <FaUser /> Passenger Information
              </SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormInput
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Phone</FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <FaCreditCard /> Payment Information
              </SectionTitle>
              
              <FormGroup>
                <FormLabel>Card Number</FormLabel>
                <FormInput
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Name on Card</FormLabel>
                <FormInput
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>Expiry Date</FormLabel>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <FormSelect
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </FormSelect>
                    
                    <FormSelect
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>CVV</FormLabel>
                  <FormInput
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={4}
                    style={{ width: '100px' }}
                  />
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <ActionButtons>
              <StyledButton type="button" onClick={handleBack} variant="outline">
                Back
              </StyledButton>
              
              <StyledButton type="submit" variant="primary">
                Complete Payment
              </StyledButton>
            </ActionButtons>
          </Form>
        </PaymentFormContainer>
        
        <OrderSummaryContainer>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummarySection>
            <SummaryTitle>Booking Summary</SummaryTitle>
            
            <SummaryItem>
              <SummaryLabel>Train:</SummaryLabel>
              <SummaryValue>{bookingData.trainName}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Train Number:</SummaryLabel>
              <SummaryValue>{bookingData.trainNumber || 'N/A'}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Route:</SummaryLabel>
              <SummaryValue>{bookingData.from} to {bookingData.to}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Departure:</SummaryLabel>
              <SummaryValue>{bookingData.departureTime || 'N/A'}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Arrival:</SummaryLabel>
              <SummaryValue>{bookingData.arrivalTime || 'N/A'}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Date:</SummaryLabel>
              <SummaryValue>{formatDate(bookingData.date)}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Selected Seats:</SummaryLabel>
              <SummaryValue>
                {bookingData.selectedSeats.map(seat => seat.fullId).join(', ')}
              </SummaryValue>
            </SummaryItem>
          </SummarySection>
          
          <SummaryDivider />
          
          <SummarySection>
            <SummaryItem>
              <SummaryLabel>Passengers:</SummaryLabel>
              <SummaryValue>{bookingData.passengers}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Base Price:</SummaryLabel>
              <SummaryValue>RM{(bookingData.totalPrice / parseInt(bookingData.passengers)).toFixed(2)}</SummaryValue>
            </SummaryItem>
          </SummarySection>
          
          <SummaryDivider />
          
          <TotalPrice>
            <span>Total Amount:</span>
            <span>RM{bookingData.totalPrice.toFixed(2)}</span>
          </TotalPrice>
        </OrderSummaryContainer>
      </PaymentContainer>
    </PageContainer>
  );
};

export default PaymentPage;