# 🚀 Quick Start: Deploy to Render in 5 Minutes

This is a TL;DR version. For full details, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Prerequisites
- GitHub account (repository pushed)
- Render account (https://render.com)

---

## 1. Create Render Blueprint (2 min)

```bash
# Make sure everything is committed
git add .
git commit -m "production: ready for deployment"
git push origin main
```

1. Go to https://dashboard.render.com
2. Click "New" → "Blueprint"
3. Select your GitHub repository (usher)
4. Authorize if prompted
5. Set name: `usher-production`
6. Branch: `main`
7. Click "Create Blueprint"

✅ Render auto-detects `render.yaml` → creates 2 services

---

## 2. Set Environment Variables (2 min)

**For Frontend Service (usher-frontend):**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://usher-backend.onrender.com` |

**For Backend Service (usher-backend):**

| Key | Value |
|-----|-------|
| `USE_MONGODB` | `false` |
| `ENVIRONMENT` | `production` |

---

## 3. Deploy (1 min)

1. In Render Dashboard, click "Deploy"
2. Watch logs: Backend deploys first, then Frontend
3. Get your URLs from the services dashboard

---

## 4. Verify (Optional but recommended)

```bash
# Test backend
curl https://usher-backend.onrender.com/health
# Expected: {"status": "ok", "database": "using_local_data"}

# Test API
curl https://usher-backend.onrender.com/api/projects
# Expected: JSON array of projects
```

Visit `https://usher-frontend.onrender.com` - you're live! 🎉

---

## Auto-Redeploy

Every push to `main` automatically redeploys both services. No manual steps needed.

---

## Need Help?

- **Build errors?** → Check Render Logs tab
- **CORS errors?** → Verify `VITE_API_URL` is correct
- **API not found?** → Restart backend service manually
- **Full guide** → Read [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Important Files

- `render.yaml` - Deployment configuration (don't edit unless you know what you're doing)
- `.env.example` - Template for front-end variables
- `backend/.env.example` - Template for back-end variables
- `PRODUCTION_READINESS.md` - Detailed audit report

---

**Status:** ✅ Your app is production-ready. Deploy now!
