from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
import os
from dotenv import load_dotenv
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

load_dotenv()
logger.info("Starting Usher Portfolio API Server")

# Skip MongoDB entirely - use local data only to avoid connection issues
# Set USE_MONGODB=true in .env to enable database
USE_MONGODB = os.getenv("USE_MONGODB", "false").lower() == "true"
db = None

if USE_MONGODB:
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://usher:Usher%4026@usher.pvfut3q.mongodb.net/")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "usher_portfolio")
    try:
        from pymongo import MongoClient
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')
        db = client[DATABASE_NAME]
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"MongoDB error: {e}")
        db = None

app = FastAPI(title="Usher Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectModel(BaseModel):
    model_config = ConfigDict(json_schema_extra={"example": {"id": "test", "title": "Test", "category": "Web", "image": "/img.png", "description": "Desc", "problem": "Prob", "solution": "Sol", "result": "Res", "techStack": ["A"]}})
    id: str
    title: str
    category: str
    subcategory: Optional[str] = None
    image: str
    description: str
    problem: str
    solution: str
    result: str
    techStack: List[str]
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None

# Local fallback data - always available
LOCAL_PROJECTS = [
    {"id": "nexus-finance", "title": "Nexus Finance", "category": "Web", "subcategory": "Web Application", "image": "/images/project1.png", "description": "A decentralized finance dashboard with real-time trading metrics.", "problem": "Existing platforms were too slow and visually cluttered for high-frequency traders.", "solution": "Built a high-performance React application with WebSockets for real-time data streaming and a dark, minimalist UI.", "result": "Increased user retention by 45% and reduced latency by 300ms.", "techStack": ["React", "TypeScript", "Tailwind CSS", "WebSockets", "Framer Motion"], "liveUrl": "https://example.com", "githubUrl": "https://github.com"},
    {"id": "pulse-fitness", "title": "Pulse Fitness Tracker", "category": "App", "subcategory": "Cross-platform", "image": "/images/project2.png", "description": "An AI-powered fitness app that adjusts workouts dynamically.", "problem": "Users struggled to maintain workout routines without personal trainers.", "solution": "Integrated a custom machine learning model to adapt workout difficulty based on biometric feedback from wearables.", "result": "Achieved over 100k downloads in the first month with a 4.8-star rating.", "techStack": ["React Native", "Python", "TensorFlow", "GraphQL"], "liveUrl": "https://example.com"},
    {"id": "aethos-ai", "title": "Aethos AI Platform", "category": "AI", "subcategory": "AI Chatbot", "image": "/images/project3.png", "description": "An enterprise AI platform for automated customer service.", "problem": "Customer support costs were scaling linearly with user growth.", "solution": "Deployed a fine-tuned LLM capable of handling 80% of tier 1 support queries with a human-like tone.", "result": "Reduced support costs by 60% while improving customer satisfaction scores.", "techStack": ["Next.js", "OpenAI API", "Redis", "PostgreSQL"], "liveUrl": "https://example.com", "githubUrl": "https://github.com"},
    {"id": "nova-commerce", "title": "Nova E-Commerce", "category": "Web", "subcategory": "E-commerce Website", "image": "/images/project4.png", "description": "A headless e-commerce storefront for a luxury tech brand.", "problem": "The client's monolithic CMS was slow and difficult to update.", "solution": "Migrated to a headless architecture using Shopify and a custom front-end.", "result": "Improved page load times by 400% and increased conversion rate by 22%.", "techStack": ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion"], "liveUrl": "https://example.com"},
    {"id": "synapse-analytics", "title": "Synapse Data Analytics", "category": "Web", "subcategory": "Web Application", "image": "/images/project5.png", "description": "A powerful data visualization tool for enterprise teams.", "problem": "Data analysts spent too much time building custom reports.", "solution": "Created an intuitive drag-and-drop dashboard builder with WebGL-powered charts.", "result": "Saved analysts an average of 15 hours per week.", "techStack": ["React", "D3.js", "Express", "MongoDB"], "liveUrl": "https://example.com", "githubUrl": "https://github.com"},
    {"id": "quantum-marketing", "title": "Quantum SaaS Campaign", "category": "Marketing", "subcategory": "SEO", "image": "/images/project6.png", "description": "A comprehensive digital marketing campaign for a B2B SaaS startup.", "problem": "The client had a great product but zero market visibility.", "solution": "Designed a multi-channel strategy focusing on SEO, content marketing, and targeted LinkedIn ads.", "result": "Generated 500+ qualified leads and a 300% ROI on ad spend.", "techStack": ["SEO", "Google Ads", "LinkedIn Ads", "HubSpot", "Figma"], "liveUrl": "https://example.com"},
    {"id": "horizon-branding", "title": "Horizon Identity", "category": "Design", "subcategory": "Branding", "image": "/images/project1.png", "description": "A complete rebrand for an aerospace engineering firm.", "problem": "The company's image felt dated and didn't reflect their cutting-edge work.", "solution": "Developed a sleek, modern visual identity, including a new logo, typography, and digital assets.", "result": "Successfully repositioned the brand to attract top-tier talent and clients.", "techStack": ["Illustrator", "Photoshop", "After Effects", "Figma"], "liveUrl": "https://example.com"},
    {"id": "omni-ai", "title": "Omni Vision AI", "category": "AI", "subcategory": "Real-time Apps", "image": "/images/project3.png", "description": "Computer vision system for automated quality control in manufacturing.", "problem": "Manual inspection was slow and prone to human error.", "solution": "Trained a custom CNN to detect microscopic defects in real-time on the assembly line.", "result": "Achieved 99.9% accuracy, completely eliminating defective product shipments.", "techStack": ["Python", "PyTorch", "OpenCV", "C++", "React"], "githubUrl": "https://github.com"},
]

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "connected" if db else "using_local_data"}

@app.get("/api/projects", response_model=List[ProjectModel])
def get_all_projects():
    # Use local data - MongoDB disabled by default
    return [ProjectModel(**p) for p in LOCAL_PROJECTS]

@app.get("/api/projects/{project_id}", response_model=ProjectModel)
def get_project(project_id: str):
    for p in LOCAL_PROJECTS:
        if p["id"] == project_id:
            return ProjectModel(**p)
    raise HTTPException(status_code=404, detail="Project not found")

@app.get("/api/projects/category/{category}", response_model=List[ProjectModel])
def get_projects_by_category(category: str):
    filtered = [p for p in LOCAL_PROJECTS if p["category"] == category]
    return [ProjectModel(**p) for p in filtered]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8003)
