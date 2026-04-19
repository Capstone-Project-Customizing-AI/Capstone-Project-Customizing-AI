## Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

## Frontend
cd frontend
npm install
npm run dev

## Open browser
http://localhost:5173

## Create Virtual Environment
python -m venv venv

## Activate Virtual Environment
# Windows (Command Prompt)
venv\Scripts\activate

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Linux / macOS
source venv/bin/activate