<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DashCourier Logistics</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: url('floating-logo-bg.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #2c2c2c;
    }
    header {
      background-color: rgba(255, 255, 255, 0.9);
      padding: 30px;
      text-align: center;
    }
    header h1 {
      font-size: 40px;
      background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Brush Script MT', cursive;
      margin: 0;
    }
    .tagline {
      font-size: 18px;
      color: #4b0082;
      margin-top: 5px;
    }
    section {
      background-color: rgba(255, 255, 255, 0.85);
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      width: 90%;
      max-width: 800px;
    }
    h2 {
      color: #4b0082;
    }
    input, textarea {
      width: 90%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }
    button {
      background-color: #FFD700;
      color: #4b0082;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    .contact-link {
      color: #4b0082;
      font-weight: bold;
      text-decoration: none;
    }
    .warehouse-img {
      width: 100%;
      border-radius: 10px;
      margin-top: 10px;
    }
    .review {
      font-style: italic;
      margin: 10px 0;
    }
    footer {
      text-align: center;
      font-size: 14px;
      padding: 20px;
      color: #4b0082;
    }
  </style>
</head>
<body>
  <header>
    <h1>DashCourier Logistics</h1>
    <div class="tagline">Powered by Eaziway Delivery 🚚 | Florida, USA</div>
  </header>

  <section>
    <h2>Track Your Package</h2>
    <input type="text" id="trackingNumber" placeholder="Enter Tracking Number" />
    <button onclick="track()">Track</button>
    <div id="result"></div>
    <p style="font-size: 14px;">Delivery dates vary based on origin and destination.</p>
  </section>

  <section>
    <h2>About DashCourier</h2>
    <p>
      DashCourier Logistics is your trusted delivery partner, powered by Eaziway. From local drop-offs to interstate logistics, we deliver with precision, speed, and premium care. Our Florida-based team ensures every package arrives safely and on time.
    </p>
    <img src="warehouse1.jpg" alt="Warehouse Team" class="warehouse-img" />
    <img src="warehouse2.jpg" alt="Logistics Workers" class="warehouse-img" />
  </section>

  <section>
    <h2>Our Services</h2>
    <p><strong>Transportation Management:</strong> We ensure your packages arrive where they need to be, when they need to be there.</p>
    <p><strong>Supplier Coordination:</strong> We simplify vendor and shipment management across borders.</p>
    <p><strong>Insurance Services:</strong> Protect your shipments and your peace of mind.</p>
    <p><strong>Mail Innovations:</strong> Affordable and reliable mailing solutions worldwide.</p>
    <p><strong>Specialized Logistics:</strong> Custom solutions for unique delivery needs.</p>
  </section>

  <section>
    <h2>Customer Reviews</h2>
    <p class="review">“DashCourier helped me reroute a package mid-transit. No stress, no delay.” — Renee M.</p>
    <p class="review">“Their WhatsApp support is instant — I got help in minutes.” — Chuka N.</p>
    <p class="review">“My online store runs smoother thanks to DashCourier’s delivery speed.” — Kemi B.</p>
    <p class="review">“I had a package coming from Atlanta to Brooklyn. It arrived earlier than expected!” — Jasmine E.</p>
    <p class="review">“DashCourier is the only delivery service I trust for my business orders.” — Tolu A.</p>
  </section>

  <section>
    <h2>Contact & Support</h2>
    <p>Email us at <a href="mailto:dashcourier.logistics@gmx.com" class="contact-link">dashcourier.logistics@gmx.com</a></p>
    <button onclick="redirectWhatsApp()">Contact via WhatsApp</button>
    <form onsubmit="submitForm(event)">
      <input type="text" id="name" placeholder="Your Name" required />
      <input type="email" id="email" placeholder="Your Email" required />
      <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div id="formResponse"></div>
    <p>Live Chat: Coming soon</p>
  </section>

  <footer>
    &copy; 2025 DashCourier Logistics | Powered by Eaziway Delivery | Florida, USA
  </footer>

  <script>
    const trackingData = {
      "CNX-4589D0716US": "In Transit - Expected Delivery: Based on location",
      "DL12345": "Delivered - Received by Customer",
      "DL09876": "Awaiting Pickup at Fort Lauderdale Hub"
    };

    function track() {
      const number = document.getElementById("trackingNumber").value.trim();
      const result = document.getElementById("result");
      if (trackingData[number]) {
        result.textContent = "Status: " + trackingData[number];
      } else {
        result.textContent = "Tracking number not found. Please check and try again.";
      }
    }

    function submitForm(event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const response = document.getElementById("formResponse");
      response.textContent = "Thank you, " + name + ". Your message has been sent!";
    }

    function redirectWhatsApp() {
      const encodedMessage = encodeURIComponent("Hello DashCourier, I need support with my delivery.");
      window.location.href = "https://wa.me/?text=" + encodedMessage;
    }
  </script>
</body>
</html>
	[:octicons-arrow-right-24: Docker installation guide](/hosting/installation/docker.md)

- __Configuration__

	Learn how to configure n8n with environment variables.

	[:octicons-arrow-right-24: Environment Variables](/hosting/configuration/environment-variables/index.md)

- __Users and authentication__

	Choose and set up user authentication for your n8n instance.

	[:octicons-arrow-right-24: Authentication](/hosting/configuration/user-management-self-hosted.md)

- __Scaling__

	Manage data, modes, and processes to keep n8n running smoothly at scale.

	[:octicons-arrow-right-24: Scaling](/hosting/scaling/queue-mode.md)

- __Securing n8n__

	Secure your n8n instance by setting up SSL, SSO, or 2FA or blocking or opting out of some data collection or features.

	[:octicons-arrow-right-24: Securing n8n guide](/hosting/securing/overview.md)

- __Starter kits__

	New to n8n or AI? Try our Self-hosted AI Starter Kit. Curated by n8n, it combines the self-hosted n8n platform with compatible AI products and components to get you started building self-hosted AI workflows.

	[:octicons-arrow-right-24: Starter kits](/hosting/starter-kits/ai-starter-kit.md)

</div>

--8<-- "_snippets/self-hosting/warning.md"
