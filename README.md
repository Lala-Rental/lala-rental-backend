# 🚀 Lala Rental Backend

**Lala Rental** is a powerful backend API for a modern property rental platform. Built with **Node.js, Express, Prisma, and PostgreSQL**, it provides seamless property management, authentication, and booking functionalities.

## ✨ Features

- **Google OAuth Authentication** 🔑  
- **Role-Based Access Control (RBAC)** 🔒  
- **Property Listings & Management** 🏡  
- **Booking System** 📅  
- **Image Uploads** 🖼️  
- **Automated Email Notifications** 📧  
- **Swagger API Documentation** 📄  

## 🛠️ Setup & Installation

### 🚀 **Run with Docker (Recommended)**

1. **Clone the repository**  

   ```sh
   git clone https://github.com/Lala-Rental/lala-rental-backend.git && cd lala-rental-backend
   ```

2. **Create & configure `.env`** (based on `.env.example`)  

3. **Start the app**  

   ```sh
   docker-compose up --build
   ```

4. **Access the API**  
   - API Base URL: `http://localhost:4000/`  
   - Swagger Docs: [http://localhost:4000/api-docs](http://localhost:5000/api-docs)  

---

### 🏗 **Run Manually (Without Docker)**

1. **Install dependencies**  

   ```sh
   npm install
   ```

2. **Run database migrations**  

   ```sh
   npx prisma migrate dev
   ```

3. **Start the server**  

   ```sh
   npm start
   ```

---

## 📚 API Documentation  

📖 Interactive API docs available at:  
🔗 **[Swagger Documentation](https://lala-rental-server.onrender.com/api-docs)**  
📖 Postman API docs also avaliable at:
🔗 **[Postman Documentation](https://documenter.getpostman.com/view/31356498/2sAYdbPsyk)**  

---

## 🤝 Contributing

Feel free to submit issues or open a PR! 🚀  

---

### Made with ❤️ by **Lala Rental Team** 🏡 with Manirabona Patience Leads
