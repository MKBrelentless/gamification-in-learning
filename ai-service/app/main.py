from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict, profile, recommend
import os

app = FastAPI(title="Gamification AI Service", version="1.0.0")

# CORS middleware - allow Railway domains
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://*.railway.app",
    "https://*.up.railway.app"
]

if os.getenv("FRONTEND_URL"):
    allowed_origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(predict.router, prefix="/predict", tags=["prediction"])
app.include_router(profile.router, prefix="/profile", tags=["profile"])
app.include_router(recommend.router, prefix="/recommend", tags=["recommendation"])

@app.get("/")
async def root():
    return {"message": "Gamification AI Service is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)