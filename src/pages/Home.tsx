import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import StyledButton from '../components/Button';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px - 80px); // Adjust based on header and footer height
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/images/train-hero.jpg') no-repeat center center;
  background-size: cover;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin-bottom: 2.5rem;
`;

const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const SearchButton = styled(StyledButton)`
  grid-column: span 2;
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.background};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate the form and then navigate
    navigate('/trains', { state: searchParams });
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Book Your Train Tickets Online</HeroTitle>
        <HeroSubtitle>
          Fast, secure, and convenient way to book train tickets. Real-time seat availability and instant confirmations.
        </HeroSubtitle>
        
        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>
                <FaMapMarkerAlt /> From
              </FormLabel>
              <FormInput
                type="text"
                name="from"
                placeholder="Departure station"
                value={searchParams.from}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <FaMapMarkerAlt /> To
              </FormLabel>
              <FormInput
                type="text"
                name="to"
                placeholder="Arrival station"
                value={searchParams.to}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <FaCalendarAlt /> Date
              </FormLabel>
              <FormInput
                type="date"
                name="date"
                value={searchParams.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                <FaUsers /> Passengers
              </FormLabel>
              <FormSelect
                name="passengers"
                value={searchParams.passengers}
                onChange={handleInputChange}
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            
            <SearchButton type="submit" fullWidth>
              <FaSearch /> Search Trains
            </SearchButton>
          </SearchForm>
        </SearchContainer>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Why Choose Our Service</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Real-time Seat Locking</FeatureTitle>
            <FeatureDescription>
              Our system locks seats in real-time on a first-come, first-serve basis, ensuring you get the seat you want.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>Instant Confirmation</FeatureTitle>
            <FeatureDescription>
              Get instant confirmation for your bookings with e-tickets delivered directly to your email.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureTitle>Live Updates</FeatureTitle>
            <FeatureDescription>
              See real-time updates of seat availability as other users make bookings or cancel reservations.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;