import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import '../styles/footer.css';
import { useState } from "react";
const Footer = () => {
  const [emailContent, setEmailContent] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (event) => {
    setEmailContent(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Assuming you have a backend API to send emails
    const response = await fetch("http://localhost:8000/sameh.khazri09@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: emailContent }),
    });

    if (response.ok) {
      setEmailSent(true);
    } else {
      // Handle error
      console.error("Failed to send email");
    }
  };

  return (
    <footer>
      <div class="footer">
        <div class="roww">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
          <a href="#"><i class="fa fa-youtube"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
        </div>

        <div class="roww">
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div class="roww">
          INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
        </div>
      </div>
    </footer>

  );
};

export default Footer;
