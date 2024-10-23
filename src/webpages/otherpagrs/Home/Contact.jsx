
import './Contact.css'; // Assuming you'll create a separate CSS file for styling
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar/>
       <div className="contact-container">
    <div className="contact-left">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.</p>
      <div className="map">
      <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.193476312897!2d31.81400622456476!3d31.408795074265278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9ef007ebfb5c7%3A0x120b889ef6ac9fe2!2siLearn%20Academy!5e0!3m2!1sar!2seg!4v1729634399935!5m2!1sar!2seg"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      
      </div>
    </div>
    
    <div className="contact-right">
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
      </div>
      <Footer/>
    </>
   
  );
}
