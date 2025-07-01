# Finance Tracker 

Track your income and expenses with an intuitive dashboard, analytics view, and transaction manager built using the MERN stack.

### 🚀 Live Preview  
Frontend: [https://your-vercel-project.vercel.app](https://finance-tracker-yole.vercel.app/login)  
Backend API: [https://your-backend.onrender.com/api/transactions](https://finance-tracker-llap.onrender.com/login)

---

##  Technologies Used

- **Frontend**: React.js, Ant Design, Axios, Moment.js
- **Backend**: Node.js, Express.js, MongoDB Cloud
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## Getting Started (Local Setup)

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```
2.**Set Up MongoDB**
   -Login to MongoDB Cloud
   -Create a cluster named financeTrackerApp
   -Add its Mongo URI to a .env file in the backend folder

   ```bash
MONGO_URI=your_mongodb_connection_string
PORT=4000


```
3.**Install Packages**
```bash
# Install for both client and server
npm run dev-install

```
3.**Start the App**
```bash
npm run dev
```

##  Screenshots

(![Screenshot 2025-07-01 10560](https://github.com/user-attachments/assets/8e1a574d-1f89-4e96-8f56-533fb927fcdd)
)

(![Screenshot 2025-07-01 105623](https://github.com/user-attachments/assets/7088d83b-08b3-4fae-b4f1-01eb07422ed4)
)

![Screenshot 2025-06-25 161136](![Screenshot 2025-07-01 105623](![Screenshot 2025-07-01 105634](https://github.com/user-attachments/assets/1fce24e9-9e88-4104-94d1-7380c5c3a477)
)


---


## Available Scripts

 **In the project directory:**

```bash
npm run dev
```
Runs both frontend and backend using concurrently.

   ```bash
npm start
```
Runs the frontend only.

```bash
npm run server
```
Runs the backend server.

```bash
npm run build
```
Builds the React app for production into the build/ folder.


## Deployment
**Frontend (Vercel)**
  -Deploy client/ folder
  -Set build as the output directory
  -Use npm run build as the build command

**Backend (Render or Vercel)**
  -Deploy the backend root (not inside client/)
  -Add required environment variables (MONGO_URI, PORT, JWT_SECRET)
  -Render will auto-detect your Express app and deploy it as a web service

   
    
    
