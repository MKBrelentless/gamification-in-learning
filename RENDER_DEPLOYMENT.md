# Deploy AI Service to Render

## Step 1: Push to GitHub
Ensure your code is pushed to GitHub with the latest changes.

## Step 2: Create Render Account
Go to https://render.com and sign up/login with GitHub.

## Step 3: Deploy AI Service

### Option A: Using Dashboard (Recommended)

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `gamification-ai-service`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `ai-service`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   PYTHON_VERSION=3.9.18
   FRONTEND_URL=https://your-frontend-url.vercel.app
   BACKEND_URL=https://your-backend-url.onrender.com
   ```

6. Click "Create Web Service"

### Option B: Using render.yaml

1. The `render.yaml` file is already in `ai-service/` folder
2. Go to https://dashboard.render.com
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Select `ai-service/render.yaml`
6. Click "Apply"
7. Add environment variables in dashboard

## Step 4: Wait for Deployment
- Build takes 2-5 minutes
- Watch logs in Render dashboard
- Service will be available at: `https://gamification-ai-service.onrender.com`

## Step 5: Verify Deployment
Test endpoints:
- Health: `https://your-service.onrender.com/health`
- Docs: `https://your-service.onrender.com/docs`

## Step 6: Update Frontend/Backend
Update your frontend and backend environment variables with the AI service URL:
```
AI_SERVICE_URL=https://your-service.onrender.com
```

## Troubleshooting

**Build fails with pydantic error:**
- Already fixed with pydantic v1.10.13

**Service not responding:**
- Check logs in Render dashboard
- Verify start command is correct
- Ensure PORT environment variable is used

**CORS errors:**
- Add your frontend URL to FRONTEND_URL env var
- Check CORS configuration in app/main.py

## Free Tier Limits
- Service sleeps after 15 min of inactivity
- 750 hours/month free
- First request after sleep takes ~30 seconds

## Cost
- Free tier: $0/month
- Paid tier: $7/month (no sleep, better performance)
