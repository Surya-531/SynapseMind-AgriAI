🌾 SynapseMind Agri-AI

         AI-Powered Decentralized Advisory System for Farmers using Internet Computer Protocol (ICP)

📌 Overview

SynapseMind Agri-AI is a decentralized AI platform designed to empower small and marginal farmers with personalized crop recommendations, yield prediction, disease detection, and weather insights.
Built on the Internet Computer Protocol (ICP), 
      our solution ensures:
                Transparency ✅
                Decentralized intelligence ✅
                On-chain AI inference without middlemen ✅

This aligns with WCHL 2025 Track: **AI - Decentralized Intelligence, building trustless and scalable AI applications**.

Our solution combines:
      
      Decentralized AI inference hosted on ICP canisters.
      Crop recommendation, yield prediction, and disease detection models.
      IoT-driven weather & soil monitoring integration.
      Farmer-friendly WebApp & Mobile UI with multilingual support.

🚜 Problem We Solve

      Farmers lack trustworthy agricultural advisory systems.
      Centralized platforms often compromise data privacy and transparency.
      Climate change and unpredictable weather patterns reduce yields.
      Smallholder farmers cannot afford private advisory services.

💡 Solution
      
      AI Models on ICP → Ensure predictions (crop yield, disease detection, weather alerts) are transparent and tamper-proof.
      IoT Integration → Sensors feed real-time soil and climate data.
      Web3 dApp → Farmers access advisory via a decentralized frontend.
      Trustless Incentive Model → Advisors and data providers can be rewarded via smart contracts.

💡 Why ICP?

We deploy our solution on Internet Computer (ICP) because:
         🔒 Internet Identity → Farmers log in without passwords, securely.
         🛠️ Canisters → AI logic & advisory services run in decentralized containers.
         🌐 On-Chain AI → Predictions stored/verifiable on-chain.
         ⚡ Scalability → Runs at Web2 speed with Web3 security.
         💰 Low Cost → Cycles make running AI models cheaper than cloud.

✨ Key Features

          🌾 Crop Recommendation Engine – Suggests best crops based on soil, climate, and region.
          📈 Yield & Profit Prediction – Helps farmers estimate production and revenue.
          🦠 Crop Disease Detection – AI-powered plant disease classifier using CNN models.
          ☁️ Weather & Climate Forecasting – LSTM/RNN-based predictive insights with extreme weather alerts.
          🤖 Chatbot Advisor – Multilingual AI assistant for farmer queries.
          🔗 ICP Integration – Smart contracts (canisters) for storing predictions & ensuring decentralization.

🛠️ Tech Stack
          Frontend: React + TailwindCSS
          Backend: Flask (Python) + ICP Canisters (Motoko/Rust)
          AI Models: TensorFlow/Keras (Crop recommendation, disease detection, weather forecasting, crop production)
          Database: ICP Stable Storage / Local development uses SQLite
          Hosting: Deployed on ICP Mainnet


🏗️ Architecture
+-----------------------+
|   IoT Sensors         |  ---> Soil & Weather Data
+-----------------------+
          |
          v
+-----------------------+       +------------------------+
|   AI Models (Crop,    |       |   Disease Detection    |
|   Yield, Weather)     |       |   (CNN, RNN, LSTM)     |
+-----------------------+       +------------------------+
          |                             |
          +-------------+---------------+
                        v
            +----------------------------+
            |  ICP Canisters (Smart AI) |
            | - Model Deployment         |
            | - Data Storage             |
            | - Smart Contracts          |
            +----------------------------+
                        |
                        v
            +----------------------------+
            |  Farmer Web/Mobile App     |
            | - Multilingual UI          |
            | - Advisory Dashboard       |
            | - Weather & Crop Alerts    |
            +----------------------------+

⚙️ Setup & Installation
Prerequisites

Node.js
 (>=16)

DFINITY SDK (dfx)

npm
 / yarn

⚙️ Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/<your-repo>/synapsemind-agri-ai.git
cd synapsemind-agri-ai

2️⃣ Install Dependencies
Backend (Python)
cd backend
python -m venv venv
source venv/bin/activate    # For Mac/Linux
venv\Scripts\activate       # For Windows
pip install -r requirements.txt

Frontend (React)
cd frontend
npm install

3️⃣ Start Backend (Model API)
cd backend
python app.py


By default, backend runs on http://127.0.0.1:5000/

4️⃣ Start Frontend (React UI)
cd frontend
npm start


Frontend runs on http://localhost:3000/

🌐 Running Locally

Open two terminals:
One for backend (Flask)
One for frontend (React)
After both are running:
Visit http://localhost:3000/   to use the web interface.

The frontend communicates with the Flask backend at http://127.0.0.1:5000/
.

Upload a leaf image (for disease detection) or enter soil/weather data (for crop recommendation).

Get predictions instantly.

ICP Integration — On-chain Logging & Authentication

We integrate the Internet Computer (ICP) as follows:

1. Internet Identity (II)
   - Farmers authenticate with II (passwordless) to obtain a principal.
   - Authentication is performed via the frontend using `@dfinity/auth-client.

2. On-chain Logging Canister
   - A Motoko canister `log_canister` stores records of input → prediction with timestamp and principal.
   - This ensures verifiable, tamper-proof records on ICP.

3. Flow (Hybrid)
   - The ML model runs off-chain (backend / Flask) due to compute constraints.
   - After inference, the frontend calls the canister to persist a hashed record of inputs and prediction on-chain.
   - UI displays canister ID and stored records so judges can verify.

4. Commands (local dev)
   - `dfx start --background`
   - `cd ic-canisters/log_canister`
   - `dfx deploy`
   - Retrieve `canister_id` from `.dfx/local/canister_ids.json` and include it in the README.



🔗 Integration Details

AI Models:

    Crop Recommendation → RandomForest, XGBoost
    Yield Prediction → LSTM, RNN models
    Disease Detection → CNN (Keras/TensorFlow)
    Weather Forecasting → IoT sensor + ML time-series models

ICP Canisters:

    Store AI weights & inference results.
    Smart contracts for advisory requests & rewards.
    dfx.json manages canister deployment.

Frontend:

    Farmer dashboard (Next.js + Tailwind).
    Multilingual support (English, Hindi, Tamil, etc.).
    API integration with deployed ICP backend.

👨‍👩‍👧 Team

Surya Prasanna R D – AI/ML Engineer
Sudharsanam A – Blockchain Developer
Jaidheep S – IoT/Hardware Integration
Shreevishal M – Frontend & UX

📈 Roadmap

🔜 Mainnet Deployment with live farmer testing
🔜 Add decentralized marketplace for farm inputs/outputs
🔜 Web App (Typescript + ICP integration)
🔜 Expand to 10k+ farmers in pilot programs


📜 License

License © SynapseMind Agri-AI Team
