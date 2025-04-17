import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaTrain, FaArrowRight, FaSubway } from 'react-icons/fa';
import StyledButton from '../components/Button';

// Updated mock data for train coaches - 6 coaches as requested
const generateMockCoaches = () => {
  return [
    {
      id: 'coach-1',
      name: 'Coach 1',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10, // Random between 10-20
      price: 0,
    },
    {
      id: 'coach-2',
      name: 'Coach 2',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10,
      price: 0,
    },
    {
      id: 'coach-3',
      name: 'Coach 3',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10,
      price: 0,
    },
    {
      id: 'coach-4',
      name: 'Coach 4',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10,
      price: 0,
    },
    {
      id: 'coach-5',
      name: 'Coach 5',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10,
      price: 0,
    },
    {
      id: 'coach-6',
      name: 'Coach 6',
      type: 'Standard',
      capacity: 20,
      availableSeats: Math.floor(Math.random() * 10) + 10,
      price: 0,
    },
  ];
};

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

const TrainSummary = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TrainName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const CoachList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CoachCard = styled.div<{ selected: boolean }>`
  background-color: ${({ theme, selected }) => selected ? `${theme.primary}1a` : theme.surface};
  border: 2px solid ${({ theme, selected }) => selected ? theme.primary : theme.border};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const CoachName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CoachType = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const CoachDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CoachSeats = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const CoachPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

interface LocationState {
  from: string;
  to: string;
  date: string;
  passengers: string;
  trainId: string;
  trainName: string;
  trainNumber: string;
  departureTime: string;
  arrivalTime: string;
}

const CoachSelectionPage: React.FC = () => {
  const { trainId } = useParams<{ trainId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [coaches] = useState(generateMockCoaches());
  const [searchParams, setSearchParams] = useState<LocationState | null>(null);
  
  useEffect(() => {
    if (location.state) {
      setSearchParams(location.state as LocationState);
    }
  }, [location.state]);
  
  const handleSelectCoach = (coachId: string) => {
    setSelectedCoach(coachId);
  };
  
  const handleContinue = () => {
    if (selectedCoach) {
      navigate(`/train/${trainId}/coach/${selectedCoach}/seats`, {
        state: {
          ...searchParams,
          coachId: selectedCoach,
        }
      });
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (!searchParams) {
    return (
      <PageContainer>
        <PageTitle>Select a Coach</PageTitle>
        <p>No train information found. Please select a train first.</p>
        <StyledButton onClick={() => navigate('/trains')} variant="primary">
          Back to Trains
        </StyledButton>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageTitle>Select a Coach</PageTitle>
      
      <TrainSummary>
        <TrainName>
          <FaTrain />
          {searchParams.trainName}
        </TrainName>
        
        <RouteInfo>
          <span>{searchParams.from}</span>
          <FaArrowRight />
          <span>{searchParams.to}</span>
        </RouteInfo>
        
        <TimeInfo>
          <span>{searchParams.departureTime} - {searchParams.arrivalTime}</span>
          <span>•</span>
          <span>Date: {new Date(searchParams.date).toLocaleDateString()}</span>
        </TimeInfo>
      </TrainSummary>
      
      <CoachList>
        {coaches.map(coach => (
          <CoachCard 
            key={coach.id}
            selected={selectedCoach === coach.id}
            onClick={() => handleSelectCoach(coach.id)}
          >
            <CoachName>
              <FaSubway />
              {coach.name}
            </CoachName>
            
            <CoachType>{coach.type}</CoachType>
            
            <CoachSeats>
              {coach.availableSeats} seats available / {coach.capacity} total
            </CoachSeats>
            
            <CoachDetails>
              <CoachSeats>
                {Math.round((coach.availableSeats / coach.capacity) * 100)}% available
              </CoachSeats>
              
              {coach.price > 0 && (
                <CoachPrice>+${coach.price.toFixed(2)}</CoachPrice>
              )}
            </CoachDetails>
          </CoachCard>
        ))}
      </CoachList>
      
      <ActionButtons>
        <StyledButton onClick={handleBack} variant="outline">
          Back to Trains
        </StyledButton>
        
        <StyledButton 
          onClick={handleContinue} 
          disabled={!selectedCoach}
          variant="primary"
        >
          Continue to Seat Selection
        </StyledButton>
      </ActionButtons>
    </PageContainer>
  );
};

export default CoachSelectionPage;