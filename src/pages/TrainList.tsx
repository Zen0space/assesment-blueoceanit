import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrain, FaArrowRight, FaClock, FaCalendarAlt } from 'react-icons/fa';
import StyledButton from '../components/Button';

// Function to generate dynamic mock trains based on search parameters
const generateMockTrains = (from: string, to: string) => {
  // Default values if from/to are empty
  const origin = from;
  const destination = to;
  
  return [
    {
      id: 'train-1',
      name: 'Express 101',
      from: origin,
      to: destination,
      departureTime: '08:00 AM',
      arrivalTime: '12:30 PM',
      duration: '4h 30m',
      price: 45.99,
      seats: 120,
      availableSeats: 78,
    },
    {
      id: 'train-2',
      name: 'Bullet 202',
      from: origin,
      to: destination,
      departureTime: '10:15 AM',
      arrivalTime: '02:30 PM',
      duration: '4h 15m',
      price: 52.99,
      seats: 150,
      availableSeats: 42,
    },
    {
      id: 'train-3',
      name: 'Regional 303',
      from: origin,
      to: destination,
      departureTime: '01:45 PM',
      arrivalTime: '06:30 PM',
      duration: '4h 45m',
      price: 39.99,
      seats: 180,
      availableSeats: 105,
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

const SearchSummary = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const TrainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TrainCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TrainName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrainTimes = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const TimeLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const Duration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

const DurationLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.border};
  position: relative;
  margin: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: -4px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid ${({ theme }) => theme.border};
  }
`;

const DurationValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const AvailabilityInfo = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const NoTrains = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: string;
}

const TrainsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });
  
  const [trains, setTrains] = useState<any[]>([]);
  
  useEffect(() => {
    if (location.state) {
      const newSearchParams = location.state as SearchParams;
      setSearchParams(newSearchParams);
      
      // Generate dynamic mock trains based on the search parameters
      const dynamicTrains = generateMockTrains(
        newSearchParams.from,
        newSearchParams.to
      );
      
      setTrains(dynamicTrains);
    }
  }, [location.state]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select a date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleSelectTrain = (trainId: string, train: any) => {
    navigate(`/train/${trainId}/coaches`, { 
      state: { 
        ...searchParams,
        trainId,
        trainName: train.name,
        trainNumber: train.name.split(' ')[1], // Extract train number (e.g., "101" from "Express 101")
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime
      } 
    });
  };
  
  return (
    <PageContainer>
      <PageTitle>Available Trains</PageTitle>
      
      <SearchSummary>
        <RouteInfo>
          <span>{searchParams.from || 'Origin'}</span>
          <FaArrowRight />
          <span>{searchParams.to || 'Destination'}</span>
        </RouteInfo>
        
        <DateInfo>
          <FaCalendarAlt />
          <span>{formatDate(searchParams.date)}</span>
          <span>•</span>
          <span>{searchParams.passengers} Passenger{parseInt(searchParams.passengers) !== 1 ? 's' : ''}</span>
        </DateInfo>
      </SearchSummary>
      
      {trains.length > 0 ? (
        <TrainList>
          {trains.map(train => (
            <TrainCard key={train.id}>
              <TrainInfo>
                <TrainName>
                  <FaTrain />
                  {train.name}
                </TrainName>
                <TrainTimes>
                  <Time>
                    <TimeValue>{train.departureTime}</TimeValue>
                    <TimeLabel>{train.from}</TimeLabel>
                  </Time>
                  
                  <Duration>
                    <DurationLine />
                    <DurationValue>{train.duration}</DurationValue>
                  </Duration>
                  
                  <Time>
                    <TimeValue>{train.arrivalTime}</TimeValue>
                    <TimeLabel>{train.to}</TimeLabel>
                  </Time>
                </TrainTimes>
              </TrainInfo>
              
              <div>
                <AvailabilityInfo>
                  <FaClock /> Departure: {formatDate(searchParams.date)} at {train.departureTime}
                </AvailabilityInfo>
                <AvailabilityInfo>
                  {train.availableSeats} seats available
                </AvailabilityInfo>
              </div>
              
              <PriceSection>
                <Price>RM{train.price.toFixed(2)}</Price>
                <StyledButton 
                  onClick={() => handleSelectTrain(train.id, train)}
                  variant="primary"
                >
                  Select Train
                </StyledButton>
              </PriceSection>
            </TrainCard>
          ))}
        </TrainList>
      ) : (
        <NoTrains>
          <h3>No trains found for your search criteria</h3>
          <p>Please try different dates or destinations</p>
        </NoTrains>
      )}
    </PageContainer>
  );
};

export default TrainsPage;