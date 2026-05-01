"""
Seed script to insert project data into MongoDB
Usage: python seed_projects.py
"""
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://usher:Usher%4026@usher.pvfut3q.mongodb.net/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'usher_portfolio')

def seed_projects():
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    projects_collection = db['projects']

    # New projects to add
    new_projects = [
        {
            'id': 'aurora-cloud',
            'title': 'Aurora Cloud Platform',
            'category': 'Web',
            'subcategory': 'Cloud Services',
            'image': '/images/project1.png',
            'description': 'A multi-cloud management platform for enterprise infrastructure.',
            'problem': 'Enterprises struggled to manage multiple cloud providers efficiently.',
            'solution': 'Built a unified dashboard for AWS, Azure, and GCP management.',
            'result': 'Reduced cloud costs by 35% across 50+ enterprise clients.',
            'techStack': ['React', 'Node.js', 'AWS SDK', 'Azure SDK', 'GCP SDK'],
            'liveUrl': 'https://example.com',
            'githubUrl': 'https://github.com',
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow(),
        },
        {
            'id': 'pulse-health',
            'title': 'Pulse Health Monitor',
            'category': 'App',
            'subcategory': 'Healthcare',
            'image': '/images/project2.png',
            'description': 'Real-time health monitoring app for elderly care.',
            'problem': 'Families needed way to remotely monitor elderly relatives health.',
            'solution': 'Created a mobile app with wearable integration and instant alerts.',
            'result': 'Prevented 100+ medical emergencies in first year.',
            'techStack': ['React Native', 'Firebase', 'Apple HealthKit', 'Google Fit'],
            'liveUrl': 'https://example.com',
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow(),
        },
        {
            'id': 'neural-search',
            'title': 'Neural Search Engine',
            'category': 'AI',
            'subcategory': 'Search',
            'image': '/images/project3.png',
            'description': 'AI-powered semantic search for enterprise knowledge bases.',
            'problem': 'Traditional keyword search failed to understand context.',
            'solution': 'Implemented semantic search using custom LLM embeddings.',
            'result': 'Improved search accuracy by 60% and reduced time-to-information.',
            'techStack': ['Python', 'OpenAI', 'Pinecone', 'FastAPI'],
            'liveUrl': 'https://example.com',
            'githubUrl': 'https://github.com',
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow(),
        },
    ]

    # Insert new projects
    result = projects_collection.insert_many(new_projects)
    print(f'✅ Successfully inserted {len(result.inserted_ids)} new projects:')
    for pid in result.inserted_ids:
        print(f'  - Inserted ID: {pid}')

    # Verify total count
    total = projects_collection.count_documents({})
    print(f'\nTotal projects in database: {total}')

if __name__ == "__main__":
    seed_projects()
