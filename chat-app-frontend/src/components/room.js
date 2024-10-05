import React, { useEffect, useState } from 'react';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);  // State to store the rooms data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error
  const [joinMessage, setJoinMessage] = useState(''); // State to store join room success/error message

  const token = sessionStorage.getItem('token');
  console.log("token in chat is >>>",token)

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log("Token retrieved in ChatRoom:", token);
  }, []);
  
  // Fetch rooms data from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/chat/Rooms', {
          headers: {
            'Authorization': `Bearer ${token}`, // Sending the token in the headers
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRooms(data.Rooms); // Set the rooms data from the API response
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setError('Error fetching rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, [token]);  // Fetch rooms whenever the token changes

  // Handle the join room functionality
  const handleJoinRoom = async (roomId) => {
    try {
      const response = await fetch('http://localhost:4001/api/chat/joinRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sending the token in the headers
        },
        body: JSON.stringify({ RoomId: roomId }), // Sending RoomId in the request body
      });
      console.log(">>>>>",token)
      if (!response.ok) {
        throw new Error('Failed to join the room');
      }

      // Display success message if room join is successful
      setJoinMessage(`Successfully joined room with ID: ${roomId}`);
    } catch (error) {
      // Display error message in case of failure
      console.error('Error joining room:', error);
      setJoinMessage(`Error joining room with ID: ${roomId}`);
    }
  };

  // Show loading state
  if (loading) return <p>Loading...</p>;
  // Show error message if there is any
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.RoomId}>
            <h2>{room.RoomName}</h2>
            <p>Room ID: {room.RoomId}</p>
            <p>Members Count: {room.members}</p>
            <button onClick={() => handleJoinRoom(room.RoomId)}>Join Room</button> {/* Join Room Button */}
          </li>
        ))}
      </ul>
      {joinMessage && <p>{joinMessage}</p>} {/* Display join success/error message */}
    </div>
  );
};

export default RoomsPage;
