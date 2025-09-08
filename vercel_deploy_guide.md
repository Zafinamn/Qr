# Deploy QR Code Generator to Vercel

## Quick Deployment Steps

1. **Push to GitHub/GitLab**
   - Create a new repository on GitHub or GitLab
   - Push your code to the repository

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub/GitLab account
   - Click "New Project"
   - Import your repository

3. **Deployment Configuration**
   - Vercel will automatically detect it's a Python project
   - The `vercel.json` file is already configured
   - Your app will be deployed automatically

## Files Ready for Deployment

✅ `vercel.json` - Vercel configuration
✅ `requirements.txt` - Python dependencies  
✅ `main.py` - Application entry point
✅ `app.py` - Flask application
✅ `static/` - CSS, JS assets
✅ `templates/` - HTML templates

## Environment Variables (if needed)

If you need to set environment variables in Vercel:
1. Go to your project dashboard in Vercel
2. Click "Settings" → "Environment Variables"
3. Add any required environment variables

## Your App Features

- QR Code generation with customizable colors
- Transparent background option
- Real-time preview
- PNG download functionality
- Responsive dark theme design

Your QR code generator is ready to deploy to Vercel!