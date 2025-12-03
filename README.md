# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/5bf49ae4-c79c-48b9-8265-f8bdf4ccd803

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5bf49ae4-c79c-48b9-8265-f8bdf4ccd803) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5bf49ae4-c79c-48b9-8265-f8bdf4ccd803) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🚀 Automatic Deployment to Nexlayer

This project is configured with **automatic deployment to Nexlayer** whenever you push changes to the `main` branch. This allows you to:

- **Code in Lovable/Replit** (dev/test environment)
- **Automatically deploy to Nexlayer** (production environment)
- **Stay in your flow** without leaving Lovable/Replit

### Setup Instructions

#### 1. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name:** `NEXLAYER_MCP_TOKEN`
   - **Value:** Your Nexlayer MCP API token (get it from [Nexlayer Dashboard](https://nexlayer.com))

#### 2. How It Works

- **When you code in Lovable/Replit:** Changes are automatically committed to GitHub
- **When you push to `main`:** GitHub Actions automatically:
  1. Builds your project
  2. Deploys to Nexlayer
  3. Provides you with a production URL

#### 3. Viewing Your Deployment URL

After a successful deployment, you can find your Nexlayer URL in several ways:

**Option A: GitHub Actions Workflow**
- Go to the **Actions** tab in your GitHub repository
- Click on the latest workflow run
- The deployment URL will be displayed in the workflow summary

**Option B: Using the DeploymentStatus Component**
Add the `DeploymentStatus` component to your app to display the deployment URL directly in Lovable/Replit:

1. Set environment variables in Lovable/Replit:
   - `VITE_GITHUB_TOKEN`: Your GitHub personal access token (with `repo` scope)
   - `VITE_GITHUB_REPOSITORY`: Your repository in format `owner/repo-name`

2. Import and use the component:
```tsx
import DeploymentStatus from '@/components/DeploymentStatus';

// In your component:
<DeploymentStatus />
```

**Option C: Using the Scripts**
Run the provided scripts to fetch the deployment URL:

```bash
# Using Node.js script
node scripts/get-deployment-url.js <GITHUB_TOKEN> <OWNER> <REPO>

# Using shell script
./scripts/get-deployment-url.sh <GITHUB_TOKEN> <OWNER> <REPO>
```

**Option D: GitHub Repository Variable**
The workflow automatically stores the deployment URL as a repository variable `NEXLAYER_DEPLOYMENT_URL` (requires admin permissions).

### Manual Deployment

You can also manually trigger a deployment:
1. Go to **Actions** tab in GitHub
2. Select **Deploy to Nexlayer** workflow
3. Click **Run workflow** → **Run workflow**

### Troubleshooting

- **Deployment fails:** Check that `NEXLAYER_MCP_TOKEN` is correctly set in GitHub Secrets
- **URL not showing:** Check the workflow logs for the deployment URL, or visit the Nexlayer dashboard
- **Component not working:** Ensure environment variables are set correctly in Lovable/Replit project settings

### Workflow Details

The GitHub Action workflow (`.github/workflows/deploy-nexlayer.yml`) does the following:
1. ✅ Checks out your code
2. ✅ Sets up Node.js
3. ✅ Installs dependencies
4. ✅ Builds your project
5. ✅ Deploys to Nexlayer
6. ✅ Stores and displays the deployment URL

### Next Steps

Once set up, you can:
- Continue coding in Lovable/Replit as usual
- Every push to `main` automatically deploys to Nexlayer
- View your production URL directly in Lovable/Replit using the `DeploymentStatus` component
