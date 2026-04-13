# Offline AI Chatbot using Qwen 2.5


A fully offline AI chatbot built using **React**, **FastAPI**, **Ollama**, and **Qwen 2.5 (1.5B)**.  
This project runs completely on a local machine without relying on any cloud-based or paid AI APIs, ensuring **data privacy**, **zero API cost**, and **offline availability**.


---


## 🚀 Features


- Fully offline AI chatbot
- No paid API or internet dependency (after setup)
- Privacy-friendly (data never leaves the system)
- Clean and simple React UI
- FastAPI backend
- Local LLM inference using Ollama


---


## 🧠 Tech Stack


- **Frontend:** React
- **Backend:** FastAPI (Python)
- **AI Engine:** Ollama
- **Language Model:** Qwen 2.5 (1.5B parameters)
- **Languages:** JavaScript, Python


---


## 📂 Project Structure



offline-ai-chatbot/
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # FastAPI backend
│ ├── server.py
│ ├── requirements.txt
│ └── venv/ # Virtual environment
│
├── README.md
└── .gitignore



---


## ⚙️ How to Run the Project Locally


### 1️⃣ Prerequisites


Make sure the following are installed:


- Node.js (LTS version)
- Python 3.9+
- Ollama


Download the Qwen model:


```bash
ollama pull qwen2.5:1.5b


2️⃣ Run Backend (FastAPI)
cd backend
venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload

Backend will run at:

http://localhost:8000


3️⃣ Run Frontend (React)
cd frontend
npm install
npm start

Frontend will run at:
http://localhost:3000


🔄 How the System Works
User sends a message from the React UI
React sends a POST request to the FastAPI backend
Backend communicates with Ollama locally
Qwen 2.5 model generates the response
Response is sent back to the frontend and displayed to the user


📌 Use Cases
Personal offline AI assistant
Learning and education support
Coding and programming help
Secure internal chatbot
AI experimentation and practice


🧪 Demo
This project is demonstrated locally using localhost.


👤 Author  
Abhishek Kumar 
