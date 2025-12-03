# 🚀 NextLayer Auto-Deployment Setup Guide

This guide will help you set up automatic deployment from Lovable/Replit to NextLayer.

## Quick Setup (5 minutes)

### Step 1: Get Your NextLayer Token

1. Go to [NextLayer Dashboard](https://nexlayer.com)
2. Navigate to your account settings
3. Generate or copy your MCP API token

### Step 2: Configure GitHub Secret

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name:** `NEXLAYER_MCP_TOKEN`
   - **Value:** Your NextLayer MCP token
5. Click **Add secret**

### Step 3: Test the Deployment

1. Make a small change in Lovable/Replit (or push to `main` branch)
2. Go to GitHub → **Actions** tab
3. Watch the workflow run
4. Once complete, you'll see your deployment URL in the workflow summary

## 🎯 Using in Lovable/Replit

### Option 1: View URL in GitHub Actions (Easiest)

After each deployment:
1. Go to GitHub → **Actions**
2. Click the latest workflow run
3. The deployment URL is displayed in the summary

### Option 2: Display URL in Your App (Game Changer!)

Add the `DeploymentStatus` component to show the URL directly in Lovable/Replit:

#### In Lovable:

1. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add:
     - `VITE_GITHUB_TOKEN`: Your GitHub personal access token (create at [github.com/settings/tokens](https://github.com/settings/tokens))
     - `VITE_GITHUB_REPOSITORY`: Your repo in format `owner/repo-name` (e.g., `username/abbottabad-wall-masterpiece`)

2. **Add the Component:**
   ```tsx
   import DeploymentStatus from '@/components/DeploymentStatus';
   
   // In your page/component:
   <DeploymentStatus />
   ```

#### In Replit:

1. **Set Environment Variables:**
   - Go to Secrets tab (lock icon)
   - Add:
     - `VITE_GITHUB_TOKEN`: Your GitHub personal access token
     - `VITE_GITHUB_REPOSITORY`: Your repo in format `owner/repo-name`

2. **Add the Component:**
   Same as Lovable above

### Option 3: Use the Scripts

You can also run the provided scripts to fetch the URL:

```bash
# In Replit shell or local terminal
node scripts/get-deployment-url.js <GITHUB_TOKEN> <OWNER> <REPO>

# Or using shell script
./scripts/get-deployment-url.sh <GITHUB_TOKEN> <OWNER> <REPO>
```

## 🔄 Workflow

```
┌─────────────────┐
│  Code in        │
│  Lovable/Replit │
└────────┬────────┘
         │
         │ Auto-commit
         ▼
┌─────────────────┐
│  Push to main   │
│  (GitHub)       │
└────────┬────────┘
         │
         │ Triggers
         ▼
┌─────────────────┐
│  GitHub Actions │
│  Workflow       │
└────────┬────────┘
         │
         │ Builds & Deploys
         ▼
┌─────────────────┐
│  NextLayer      │
│  Production     │
└─────────────────┘
```

## 📋 What Gets Deployed?

- ✅ Built static files from `dist/` folder
- ✅ All assets and resources
- ✅ Production-optimized bundle

## 🐛 Troubleshooting

### Deployment Fails

**Error: "NEXLAYER_MCP_TOKEN not found"**
- Solution: Make sure you've added the secret in GitHub Settings → Secrets → Actions

**Error: "Deployment failed with HTTP code 401"**
- Solution: Your NextLayer token is invalid or expired. Get a new one from NextLayer dashboard.

**Error: "Deployment failed with HTTP code 404"**
- Solution: Check that the NextLayer API endpoint is correct and your account has access.

### URL Not Showing

**The deployment succeeds but no URL appears:**
- Check the workflow logs for the full response
- Visit NextLayer dashboard to find your deployment
- The URL might be in the response body but in a different format

**Component shows "No successful deployments found":**
- Make sure you've pushed to `main` branch at least once
- Check that the workflow completed successfully
- Verify your GitHub token has `repo` scope

## 🎉 Success!

Once set up, you can:
- ✅ Code in Lovable/Replit without leaving
- ✅ Automatically deploy to NextLayer on every push
- ✅ See your production URL directly in your app
- ✅ Stay in your development flow

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NextLayer Documentation](https://nexlayer.com/docs)
- [Lovable Git Integration](https://docs.lovable.dev/integrations/git-integration)
- [Replit GitHub Integration](https://docs.replit.com/getting-started/git)

## 💡 Pro Tips

1. **Use the DeploymentStatus component** - It's the easiest way to see your URL in Lovable/Replit
2. **Check workflow logs** - If something fails, the logs have detailed error messages
3. **Manual trigger** - You can manually trigger deployments from the Actions tab
4. **Multiple environments** - You can create separate workflows for staging/production

## 🚀 Next Steps

After your first successful deployment:
1. Bookmark your NextLayer URL
2. Share it with your team
3. Set up custom domain (if needed)
4. Continue coding in Lovable/Replit! 🎨

