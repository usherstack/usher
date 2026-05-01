# USHER Professional - Modern Creative Agency Portfolio

> A production-ready, full-stack creative agency portfolio built with cutting-edge web technologies, featuring animated components, team showcase, calendar booking integration, and responsive design.

![GitHub](https://img.shields.io/github/license/usher-tech/usher-professional)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009485?logo=fastapi)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### Frontend Features

- ✨ **Smooth Animations** - Framer Motion with GPU-accelerated effects
- 🎨 **Modern Design** - Tailwind CSS with custom theme and dark mode
- 📱 **Fully Responsive** - Mobile-first design for all screen sizes
- 🚦 **Smooth Routing** - Client-side routing with page transitions
- 📦 **Component Library** - 40+ pre-built Radix UI components
- 🎯 **Performance Optimized** - Code splitting, lazy loading, image optimization
- 🌙 **Theme Support** - Dynamic light/dark mode with system preference detection
- ♿ **Accessible** - WCAG 2.1 compliance with semantic HTML
- 🔍 **SEO Ready** - Meta tags, structured data, Open Graph support

### Business Features

- 👥 **Team Showcase** - 6 team members with profiles and social links
- 📅 **Calendar Booking** - Calendly integration for meeting scheduling
- 💼 **Portfolio Grid** - Filterable project showcase with live demos
- 📝 **Dynamic Content** - Testimonials, services, and statistics
- 📞 **Contact Information** - Email, phone, social media, address
- 📜 **Legal Pages** - Terms of Service and Privacy Policy included
- 💬 **Live Chat** - Integrated chatbot for visitor support

### Backend Features

- ⚡ **FastAPI** - Modern async Python web framework
- 🗄️ **MongoDB** - NoSQL database with flexible schemas
- 🔐 **CORS** - Secure cross-origin requests
- 📊 **RESTful API** - Clean, intuitive endpoint design
- ✅ **Data Validation** - Pydantic models with automatic validation
- 🏥 **Health Checks** - API monitoring and uptime verification
- 📧 **Booking System** - Project inquiry and calendar booking management

## 🛠️ Tech Stack

### Frontend

| Technology      | Version | Purpose                              |
| --------------- | ------- | ------------------------------------ |
| React           | 19.1.0  | UI library with concurrent rendering |
| TypeScript      | 5.9.3   | Type-safe JavaScript                 |
| Vite            | 7.3.2   | Lightning-fast build tool            |
| Tailwind CSS    | 3.4.14  | Utility-first CSS framework          |
| Framer Motion   | 11.0.8  | Advanced animations                  |
| Wouter          | 3.3.5   | Lightweight routing                  |
| React Hook Form | 7.71.2  | Performant form handling             |
| Zod             | 3.25.8  | TypeScript-first schema validation   |
| React Icons     | 4.12.0  | Icon library                         |
| Radix UI        | Latest  | Accessible UI components             |

### Backend

| Technology | Version    | Purpose                 |
| ---------- | ---------- | ----------------------- |
| FastAPI    | 0.104.1    | Async web framework     |
| Python     | 3.10+      | Programming language    |
| MongoDB    | 4.6.1      | NoSQL database          |
| Pydantic   | Latest     | Data validation         |
| CORS       | Middleware | Cross-origin protection |

## 📋 Prerequisites

### System Requirements

- Node.js 18.0 or higher
- Python 3.10 or higher
- MongoDB 4.6 or higher (or MongoDB Atlas account)
- npm or pnpm

### Accounts Needed

- MongoDB Atlas (optional for cloud database)
- GitHub (for version control and deployment)
- Vercel/Netlify (for frontend hosting)
- Railway/Render (for backend hosting)

## 🚀 Quick Start

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/usher-tech/usher-professional.git
cd usher-professional

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your API URL
# VITE_API_URL=http://localhost:8003

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Backend Setup

```bash
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with MongoDB connection
# MONGODB_URI=mongodb://localhost:27017
# DATABASE_NAME=usher_portfolio

# Start the server
python main.py

# API will be available at http://localhost:8003
```

### Database Setup

**Option 1: Local MongoDB**

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**Option 2: MongoDB Atlas (Recommended for production)**

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create database user
4. Get connection string
5. Add to `.env`: `MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority`

## 📁 Project Structure

```
usher-professional/
├── src/
│   ├── components/
│   │   ├── animations/           # Animation components
│   │   ├── features/             # Feature-specific components
│   │   ├── layout/               # Header, footer
│   │   ├── shared/               # Shared utilities
│   │   └── ui/                   # Radix UI components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx             # Team section
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx         # Filterable grid
│   │   ├── Contact.tsx           # Calendly booking
│   │   ├── TermsOfService.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── data/                 # Data files
│   │   └── utils/                # Utility functions
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── App.tsx                   # Router configuration
│   └── main.tsx                  # Entry point
│
├── public/
│   ├── avatars/                  # Team member avatars
│   └── images/                   # Portfolio images
│
├── main.py                       # Backend entry point
├── requirements.txt              # Python dependencies
├── package.json                  # Node dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind configuration
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── LICENSE                       # MIT License
├── README.md                     # This file
├── CONTRIBUTING.md               # Contribution guidelines
├── DEPLOYMENT.md                 # Deployment guide
└── ARCHITECTURE.md               # System architecture

```

## 🎯 API Endpoints

### Projects

```
GET    /api/projects              # Fetch all projects
POST   /api/projects              # Create new project
PUT    /api/projects/{id}         # Update project
DELETE /api/projects/{id}         # Delete project
```

### Bookings

```
POST   /api/booking/submit        # Submit booking request
GET    /api/bookings              # Fetch all bookings
```

### Health

```
GET    /health                    # API health check
```

## 🎨 Component Architecture

### Organized by Purpose

- **animations/** - Pure animation components (Counter, Gradient, Button, Text, Slider)
- **features/** - Feature-specific components (Chatbot, Hero, Portfolio, Services, Team)
- **shared/** - Shared utilities (Cursor Effect, Loader, Page Transition, Theme Toggle)
- **layout/** - Layout components (Navbar, Footer)
- **ui/** - Radix UI + custom components (40+ pre-built)

### Key Components

**Hero Section**

- Full-width animated banner
- Typing animation with gradient text
- Magnetic button effects
- Call-to-action buttons

**Team Section**

- 3-column responsive grid
- Team member cards with images
- Role badges with gradients
- Social media links
- Hover animations

**Portfolio Grid**

- Filterable by category/subcategory
- Live preview modal
- Project details page
- Tech stack badges

**Contact Page**

- Calendly booking widget
- Contact information
- Social media links
- Async Calendly loading

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:8003
```

**Backend (.env)**

## 📦 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Backend Build

```bash
# No build needed, run directly
python main.py

# Or using Docker
docker build -t usher-api .
docker run -p 8000:8000 usher-api
```

### Deployment

**Frontend (Vercel/Netlify)**

```bash
npm run build  # Creates dist/ folder
# Deploy dist/ folder to Vercel/Netlify
```

**Backend (Railway/Render)**

```bash
git push  # Automatic deployment
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 Testing

```bash
# TypeScript type checking
npm run typecheck

# Build verification
npm run build

# Preview production build
npm run preview
```

## 📊 Performance Metrics

- **Lighthouse Score:** 95+
- **Page Load Time:** < 2 seconds
- **API Response Time:** < 200ms
- **Time to Interactive:** < 3 seconds

## 🔐 Security Features

- ✅ TypeScript strict mode
- ✅ XSS protection (React built-in)
- ✅ CSRF protection ready
- ✅ Secure headers (CORS, CSP)
- ✅ Environment variable security
- ✅ No API keys in source code
- ✅ Database connection pooling
- ✅ Input validation (Pydantic/Zod)

## 📱 Responsive Design

- ✅ Mobile first approach
- ✅ Tested on all major devices
- ✅ Touch-friendly interactions
- ✅ Optimized images
- ✅ Accessible navigation

| Breakpoint | Screen Size    |
| ---------- | -------------- |
| Mobile     | < 640px        |
| Tablet     | 640px - 1024px |
| Desktop    | > 1024px       |

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Workflow guidelines
- Code standards
- Commit message format
- Pull request process
- Development setup

**Quick Start Contributing:**

```bash
git checkout -b feature/your-feature
# Make changes
npm run build
git commit -m "feat: your feature"
git push origin feature/your-feature
# Create pull request
```

### Frontend Issues

**Blank white page:**

- Check browser console for errors
- Verify `VITE_API_URL` in `.env`
- Clear browser cache and rebuild

**API calls failing:**

- Verify backend is running on correct port
- Check CORS configuration
- Review Network tab in DevTools

### Backend Issues

**Database connection failed:**

- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify database user permissions

**Port already in use:**

```bash
# Find and kill process using port 8003
lsof -i :8003
kill -9 <PID>
```

## 📈 Roadmap

- [ ] Admin dashboard for project management
- [ ] User authentication system
- [ ] Email notifications for bookings
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Blog integration
- [ ] Social media feed integration
- [ ] Performance monitoring dashboard

## 📞 Support & Contact

- **Email:** info.usherstack@gmail.com
- **Phone:** +91 8948552234
- **Instagram:** @usher.tech
- **GitHub Issues:** Report bugs and feature requests

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) for details.

## 👏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)
- API by [FastAPI](https://fastapi.tiangolo.com)
- Database: [MongoDB](https://www.mongodb.com)
- Hosted on [Vercel](https://vercel.com) and [Railway](https://railway.app)

---

**Made with ❤️ by USHER Professional**

⭐ If you find this useful, please consider giving it a star!

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Next Steps

1. Add more section components
2. Implement API integration
3. Add form validation
4. Setup CI/CD pipeline
5. Add unit tests
6. Implement Analytics

## License

MIT

## Support

For questions or issues, please create an issue or contact the development team.

# usher
