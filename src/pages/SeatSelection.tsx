import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaTrain, FaSubway, FaChair, FaCheck, FaTimes, FaLock } from 'react-icons/fa';
import StyledButton from '../components/Button';

// Mock data for seats
// Update the generateSeats function to match the requirements
const generateSeats = (coachId: string) => {
  // Each coach has 20 seats (5 rows of 4 seats)
  const rows = 5;
  const seatsPerRow = 4;
  const seats = [];
  
  // Extract coach number from coachId (e.g., "coach-1" -> 1)
  const coachNumber = parseInt(coachId.split('-')[1]);
  
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(64 + seat); // A, B, C, D
      const seatId = `${row}${seatLetter}`;
      
      // Randomly mark some seats as booked or locked
      const randomStatus = Math.random();
      let status = 'available';
      
      if (randomStatus < 0.2) {
        status = 'booked';
      } else if (randomStatus < 0.3) {
        status = 'locked';
      }
      
      seats.push({
        id: seatId,
        fullId: `Coach ${coachNumber}-${seatId}`, // Include coach number in full ID
        row,
        column: seat,
        status,
        coachNumber
      });
    }
  }
  
  return seats;
};

// Update the Seat interface to include the new properties
interface Seat {
  id: string;
  fullId: string; // Full seat ID including coach number
  row: number;
  column: number;
  status: string;
  coachNumber: number;
}

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

const BookingSummary = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TrainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const CoachInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const SeatSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SeatMapContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SeatMapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SeatMapTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const SeatLegend = styled.div`
  display: flex;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const SeatStatus = styled.div<{ status: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  background-color: ${({ status, theme }) => 
    status === 'available' ? theme.background :
    status === 'selected' ? theme.primary :
    status === 'locked' ? theme.warning :
    theme.error};
  border: 1px solid ${({ status, theme }) => 
    status === 'available' ? theme.border :
    status === 'selected' ? theme.primary :
    status === 'locked' ? theme.warning :
    theme.error};
`;

const SeatMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const SeatRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RowNumber = styled.div`
  width: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const SeatGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const Seat = styled.div<{ status: string }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  background-color: ${({ status, theme }) => 
    status === 'available' ? theme.background :
    status === 'selected' ? theme.primary :
    status === 'locked' ? theme.warning :
    theme.error};
  border: 1px solid ${({ status, theme }) => 
    status === 'available' ? theme.border :
    status === 'selected' ? theme.primary :
    status === 'locked' ? theme.warning :
    theme.error};
  color: ${({ status, theme }) => 
    status === 'selected' ? 'white' : theme.text};
  cursor: ${({ status }) => 
    status === 'available' ? 'pointer' : 'not-allowed'};
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: ${({ status }) => 
      status === 'available' ? 'scale(1.05)' : 'none'};
  }
`;

const SeatIcon = styled.div`
  font-size: 1rem;
`;

const SelectedSeatsContainer = styled.div`
  flex: 0 0 300px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const SelectedSeatsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const SelectedSeatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectedSeat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

const SeatInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const RemoveSeat = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.error};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    background-color: ${({ theme }) => theme.error}1a;
  }
`;

const PriceSummary = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-weight: 600;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

// Update the LocationState interface to include more train details
interface LocationState {
  from: string;
  to: string;
  date: string;
  passengers: string;
  trainId: string;
  coachId: string;
  trainName: string;
  departureTime?: string;
  arrivalTime?: string;
  trainNumber?: string;
}

const SeatSelectionPage: React.FC = () => {
  const { trainId, coachId } = useParams<{ trainId: string; coachId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [searchParams, setSearchParams] = useState<LocationState | null>(null);
  const [basePrice, setBasePrice] = useState(45.99); // Default price
  const [coachPrice, setCoachPrice] = useState(0); // Additional price for coach type
  
  useEffect(() => {
    // In a real app, you would fetch seat data
    if (coachId) {
      setSeats(generateSeats(coachId));
      
      // Set coach price based on coach type
      if (coachId === 'coach-3') {
        setCoachPrice(25);
      } else if (coachId === 'coach-4') {
        setCoachPrice(50);
      } else {
        setCoachPrice(0);
      }
    }
    
    if (location.state) {
      setSearchParams(location.state as LocationState);
    }
  }, [coachId, location.state]);
  
  // Add a function to simulate locking a seat when a user starts booking
  const lockSeat = (seatId: string) => {
    // In a real app, you would make an API call to lock the seat on the server
    console.log(`Locking seat ${seatId} for this user's session`);
    
    // Update the seat status locally
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        return { ...s, status: 'locked' };
      }
      return s;
    });
    
    setSeats(updatedSeats);
  };
  
  // Update the handleSeatClick function to lock seats
  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    
    if (!seat || (seat.status !== 'available' && seat.status !== 'selected')) {
      return;
    }
    
    // Check if we already have enough seats selected
    const requiredSeats = searchParams?.passengers ? parseInt(searchParams.passengers) : 1;
    
    if (selectedSeats.length >= requiredSeats && !selectedSeats.some(s => s.id === seatId)) {
      alert(`You can only select ${requiredSeats} seat(s).`);
      return;
    }
    
    // If the seat is being selected (not deselected), lock it temporarily
    if (seat.status === 'available') {
      lockSeat(seatId);
    }
    
    // Update seat status
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        const newStatus = s.status === 'selected' ? 'available' : 'selected';
        return { ...s, status: newStatus };
      }
      return s;
    });
    
    setSeats(updatedSeats);
    
    // Update selected seats
    const updatedSelectedSeats = updatedSeats.filter(s => s.status === 'selected');
    setSelectedSeats(updatedSelectedSeats);
  };
  
  const handleRemoveSeat = (seatId: string) => {
    // Update seat status
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        return { ...s, status: 'available' };
      }
      return s;
    });
    
    setSeats(updatedSeats);
    
    // Update selected seats
    const updatedSelectedSeats = updatedSeats.filter(s => s.status === 'selected');
    setSelectedSeats(updatedSelectedSeats);
  };
  
  const handleContinue = () => {
    const requiredSeats = searchParams?.passengers ? parseInt(searchParams.passengers) : 1;
    
    if (selectedSeats.length !== requiredSeats) {
      alert(`Please select exactly ${requiredSeats} seat(s).`);
      return;
    }
    
    navigate('/payment', {
      state: {
        ...searchParams,
        selectedSeats,
        totalPrice: calculateTotalPrice(),
      }
    });
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const calculateTotalPrice = () => {
    const numPassengers = searchParams?.passengers ? parseInt(searchParams.passengers) : 1;
    return (basePrice + coachPrice) * numPassengers;
  };
  
  const getCoachName = () => {
    switch (coachId) {
      case 'coach-1': return 'Coach A (Standard)';
      case 'coach-2': return 'Coach B (Standard)';
      case 'coach-3': return 'Coach C (Business)';
      case 'coach-4': return 'Coach D (First Class)';
      default: return 'Selected Coach';
    }
  };
  
  // Group seats by row for display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, any[]>);
  
  return (
    <PageContainer>
      <PageTitle>Select Your Seats</PageTitle>
      
      <BookingSummary>
        <TrainInfo>
          <FaTrain />
          {searchParams?.trainName || 'Selected Train'} 
          {searchParams?.trainNumber && ` (${searchParams.trainNumber})`}
        </TrainInfo>
        
        <CoachInfo>
          <FaSubway />
          {getCoachName()}
        </CoachInfo>
        
        {/* Add departure and arrival time if available */}
        {(searchParams?.departureTime || searchParams?.arrivalTime) && (
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Time:</strong> {searchParams?.departureTime || 'N/A'} - {searchParams?.arrivalTime || 'N/A'}
          </div>
        )}
      </BookingSummary>
      
      <SeatSelectionContainer>
        <SeatMapContainer>
          <SeatMapHeader>
            <SeatMapTitle>Seat Map</SeatMapTitle>
            
            <SeatLegend>
              <LegendItem>
                <SeatStatus status="available" />
                <span>Available</span>
              </LegendItem>
              
              <LegendItem>
                <SeatStatus status="selected" />
                <span>Selected</span>
              </LegendItem>
              
              <LegendItem>
                <SeatStatus status="booked" />
                <span>Booked</span>
              </LegendItem>
              
              <LegendItem>
                <SeatStatus status="locked" />
                <span>Locked</span>
              </LegendItem>
            </SeatLegend>
          </SeatMapHeader>
          
          <SeatMap>
            {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
              <SeatRow key={rowNum}>
                <RowNumber>{rowNum}</RowNumber>
                
                <SeatGroup>
                  {rowSeats.slice(0, 2).map((seat: Seat) => (
                    <Seat 
                      key={seat.id}
                      status={seat.status}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      {seat.status === 'booked' ? (
                        <SeatIcon><FaTimes /></SeatIcon>
                      ) : seat.status === 'locked' ? (
                        <SeatIcon><FaLock /></SeatIcon>
                      ) : seat.status === 'selected' ? (
                        <SeatIcon><FaCheck /></SeatIcon>
                      ) : (
                        seat.id
                      )}
                    </Seat>
                  ))}
                </SeatGroup>
                
                <SeatGroup>
                  {rowSeats.slice(2, 4).map((seat: Seat) => (
                    <Seat 
                      key={seat.id}
                      status={seat.status}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      {seat.status === 'booked' ? (
                        <SeatIcon><FaTimes /></SeatIcon>
                      ) : seat.status === 'locked' ? (
                        <SeatIcon><FaLock /></SeatIcon>
                      ) : seat.status === 'selected' ? (
                        <SeatIcon><FaCheck /></SeatIcon>
                      ) : (
                        seat.id
                      )}
                    </Seat>
                  ))}
                </SeatGroup>
              </SeatRow>
            ))}
          </SeatMap>
        </SeatMapContainer>
        
        <SelectedSeatsContainer>
          <SelectedSeatsTitle>Selected Seats</SelectedSeatsTitle>
          
          {selectedSeats.length > 0 ? (
            <SelectedSeatsList>
              {selectedSeats.map(seat => (
                <SelectedSeat key={seat.id}>
                  <SeatInfo>
                    <FaChair />
                    Seat {seat.id}
                  </SeatInfo>
                  
                  <RemoveSeat onClick={() => handleRemoveSeat(seat.id)}>
                    <FaTimes />
                  </RemoveSeat>
                </SelectedSeat>
              ))}
            </SelectedSeatsList>
          ) : (
            <p>No seats selected yet.</p>
          )}
          
          <PriceSummary>
            <PriceRow>
              <span>Base Price:</span>
              <span>RM{basePrice.toFixed(2)}</span>
            </PriceRow>
            
            {coachPrice > 0 && (
              <PriceRow>
                <span>Coach Upgrade:</span>
                <span>+RM{coachPrice.toFixed(2)}</span>
              </PriceRow>
            )}
            
            <PriceRow>
              <span>Passengers:</span>
              <span>{searchParams?.passengers || 1}</span>
            </PriceRow>
            
            <TotalPrice>
              <span>Total:</span>
              <span>RM{calculateTotalPrice().toFixed(2)}</span>
            </TotalPrice>
          </PriceSummary>
        </SelectedSeatsContainer>
      </SeatSelectionContainer>
      
      <ActionButtons>
        <StyledButton onClick={handleBack} variant="outline">
          Back to Coach Selection
        </StyledButton>
        
        <StyledButton 
          onClick={handleContinue} 
          disabled={selectedSeats.length === 0}
          variant="primary"
        >
          Continue to Payment
        </StyledButton>
      </ActionButtons>
    </PageContainer>
  );
};

export default SeatSelectionPage;