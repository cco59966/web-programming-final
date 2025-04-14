import React from 'react';
import '../css/CheckoutPage.css';
import Image from "next/image";
import connectMongoDB from "../config/mongodb";


const CheckoutPage: React.FC = () => {
  return (
    <div>
      <header>
        <div className="dropdown">
          Dropdown
          <div className="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
          </div>
        </div>
        <div className="title">Warnell VR Checkout System</div>
        <button className="logout-button">Logout</button>
      </header>

      {/* Info box on the left-hand side */}
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
        <form action="#" method="POST">
          <label htmlFor="headsetQuantity">How many headsets would you want:</label>
          <input type="number" id="headsetQuantity" name="headsetQuantity" min="1" required />
          
          <label htmlFor="checkoutDate">Choose checkout date:</label>
          <input type="date" id="checkoutDate" name="checkoutDate" required />
          
          <label htmlFor="startDate">Start date:</label>
          <input type="date" id="startDate" name="startDate" required />
          
          <label htmlFor="endDate">End date:</label>
          <input type="date" id="endDate" name="endDate" required />
          
          <button type="submit">Submit Reservation</button>
        </form>
      </div>

      <footer>
        <div className="links-column">
          <a href="https://eits.uga.edu/resources/" target="_blank" rel="noopener noreferrer">Resources</a>
          <a href="https://warnell.uga.edu/resources-students" target="_blank" rel="noopener noreferrer">Contact Warnell IT</a>
          <a href="https://my.uga.edu/htmlportal/index.php?guest=normal/render.uP" target="_blank" rel="noopener noreferrer">MYUGA</a>
          <a href="https://eits.uga.edu/support/" target="_blank" rel="noopener noreferrer">Help</a>
        </div>
        <div style={{ textAlign: "center", width: "100%", marginTop: "5px" }}>
          © University of Georgia.
        </div>
      </footer>

      <img src="univ.png" alt="UGA Logo" className="logo" />
    </div>
  );
};

export default CheckoutPage;
