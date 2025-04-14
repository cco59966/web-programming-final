"use client"

// Import React and useState hook to manage component state
import React, { useState } from 'react';

// Define the functional component AddItem
const AddItem: React.FC = () => {
  // State to store the headset number entered by the user
  const [headsetNumber, setHeadsetNumber] = useState('');
  
  // State to store the headset name entered by the user
  const [headsetName, setHeadsetName] = useState('');
  
  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    // Prevent the page from refreshing on form submit
    event.preventDefault();

    // Create a new headset object with number, name, and default status "Available"
    const newHeadset = {
      number: headsetNumber,
      name: headsetName,
      status: 'Available' // Default status automatically set
    };

    // Log the newly created headset object to the console (for testing)
    console.log('New Headset Added:', newHeadset);

    // After submission, reset the form fields back to empty
    setHeadsetNumber('');
    setHeadsetName('');
  };

  // Return JSX to render the Add Item form
  return (
    // Form container
    <form onSubmit={handleSubmit}>
      {/* Label and input field for headset number */}
      <label htmlFor="headsetNumber">Headset Number:</label>
      <input
        type="text"
        id="headsetNumber"
        value={headsetNumber}
        onChange={(e) => setHeadsetNumber(e.target.value)}
        required // Make this input required
      />

      {/* Label and input field for headset name */}
      <label htmlFor="headsetName">Headset Name:</label>
      <input
        type="text"
        id="headsetName"
        value={headsetName}
        onChange={(e) => setHeadsetName(e.target.value)}
        required // Make this input required
      />

      {/* Submit button to add headset */}
      <button type="submit">Add Headset</button>
    </form>
  );
};

// Exporting the AddItem component so it can be used in other files
export default AddItem;
