"use client"

// Importing React library to use JSX syntax for creating the component
import React from 'react'; 

// Importing the CSS file that contains styles for this component
import '.././css/CheckoutPage.css'; 

// Importing the AddItem component from 'add-item.tsx' to allow users to add new headsets
import AddItem from './add-item'; 
import { useRouter } from 'next/navigation';

// Defining the CheckoutPage functional component
const CheckoutPage: React.FC = () => { 
const router = useRouter(); // Using Next.js router for navigation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('/login'); // ✅ Redirect to desired page
    
  };
  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('checkout'); // ✅ Redirect to desired page
    
  };
  const handleSubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
   
      router.push('home'); // ✅ Redirect to desired page
    
  };
  return ( // Start of the component JSX
    <div className="min-h-screen flex flex-col">
    {/* HEADER (Red Bar) */}
    <header className="bg-[#b20000] text-black flex justify-between items-center px-8 py-6">
      <div className = "flex items-center justify-start">
 
      <h1 className="text-3xl font-bold text-left">Warnell VR Checkout System</h1>
      </div>
      <form onSubmit={handleSubmit3}>
      <button
       
       className="bg-black text-white px-4 py-2 rounded font-semibold"
     >
      Return Home
     </button>
     </form>
      <form onSubmit={handleSubmit2}>
      <button
       
       className="bg-black text-white px-4 py-2 rounded font-semibold"
     >
      Add Items
     </button>
     </form>
     <form onSubmit={handleSubmit}>
      <button
       
        className="bg-black text-white px-4 py-2 rounded font-semibold"
      >
       Logout
      </button>
      </form>
    </header>

      {/* Information box on the left-hand side of the page with details */}
      <div className="info">
        Please select desired pickup date for VR headsets.<br />
        Reservations are first come, first serve.<br />
        Headsets may be reserved up to a week in advance.<br />
        Headsets must be returned within 24 hours.<br /><br />
        If you have any questions regarding technology please visit the Warnell IT office,<br />
        located in building 4, room 424 or contact (678)-599-3529.
      </div>

      {/* Reservation form in the center of the page */}
      <div className="reservation">
        <h2>Reservation Details</h2>
        <form action="#" method="POST"> {/* Form to submit reservation */}
          {/* Label and input for the number of headsets */}
          <label htmlFor="headsetQuantity">How many headsets would you want:</label>
          <input type="number" id="headsetQuantity" name="headsetQuantity" min="1" required />

          {/* Label and input for selecting the checkout date */}
          <label htmlFor="checkoutDate">Choose checkout date:</label>
          <input type="date" id="checkoutDate" name="checkoutDate" required />

          {/* Label and input for selecting the start date */}
          <label htmlFor="startDate">Start date:</label>
          <input type="date" id="startDate" name="startDate" required />

          {/* Label and input for selecting the end date */}
          <label htmlFor="endDate">End date:</label>
          <input type="date" id="endDate" name="endDate" required />

          {/* Submit button for the reservation form */}
          <button type="submit">Submit Reservation</button>
        </form>
      </div>


      {/* Divider line */}
      <hr />

      {/* Section to add a new headset */}
      <div className="add-item-section">
        {/* Title for the add headset section */}
        <h2>Add a New Headset</h2>

        {/* AddItem component renders the form to add headset number and name */}
        <AddItem />
      </div>



      {/* Footer of the page containing resource links */}
      <footer>
        <div className="links-column">
          {/* Resource links for the user */}
          <a href="https://eits.uga.edu/resources/" target="_blank" rel="noopener noreferrer">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" target="_blank" rel="noopener noreferrer">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" target="_blank" rel="noopener noreferrer">MYUGA</a>
          <a href="https://eits.uga.edu/support/" target="_blank" rel="noopener noreferrer">Help</a>
        </div>
        <div style={{ textAlign: "center", width: "100%", marginTop: "5px" }}>
          {/* Footer text */}
          Â© University of Georgia.
        </div>
      </footer>

      {/* University logo at the bottom left */}
      <img src="univ.png" alt="UGA Logo" className="logo" />
    </div>
  );
};

// Exporting the CheckoutPage component for use in other parts of the application
export default CheckoutPage;
