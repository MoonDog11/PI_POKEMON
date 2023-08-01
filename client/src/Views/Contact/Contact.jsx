import React from 'react';
import Fondo from "../../Imagenes/FONDO_CONTACT.mp4";
import "../Contact/Contact.css"; 

const Contact = () => {
  return (
    <div>
      <video autoPlay loop muted className="video-background">
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className="form-container">
        <h1>Contact / Register</h1>
        <form>
          <label htmlFor="fullName">Name:</label>
          <input type="text" id="fullName" name="fullName" required />
          <br />
          <label htmlFor="email">E-Mail:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
          <br />
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" />
          <br />
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" />
          <br />
          <label htmlFor="comment">Coment:</label>
          <textarea id="comment" name="comment" rows="4" cols="50" required></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;