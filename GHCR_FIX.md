# Fix GitHub Container Registry Permission Error

## The Problem
GitHub Actions `GITHUB_TOKEN` doesn't have permission to push to organization packages in GHCR.

## Solutions (Choose One)

### Option 1: Use Personal Access Token (Recommended)

1. Create a Personal Access Token (PAT):
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: `GHCR Push Token`
   - Select scopes: `write:packages` and `read:packages`
   - Click "Generate token"
   - Copy the token

2. Add to GitHub Secrets:
   - Go to: https://github.com/hamidabbass/abbottabad-wall-masterpiece/settings/secrets/actions
   - Click "New repository secret"
   - Name: `GHCR_PAT`
   - Value: Your PAT token
   - Click "Add secret"

3. Push again - it should work!

### Option 2: Use Docker Hub

1. Create Docker Hub account: https://hub.docker.com/signup

2. Create access token:
   - Go to: https://hub.docker.com/settings/security
   - Click "New Access Token"
   - Name: `github-actions`
   - Copy the token

3. Add to GitHub Secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

4. Push again - workflow will use Docker Hub instead!

### Option 3: Make Package Public Manually

1. After the workflow runs (even if it fails), go to:
   - https://github.com/hamidabbass?tab=packages
   - Find `abbottabad-wall-masterpiece`
   - Click on it → Package settings → Change visibility → Public

2. Then re-run the workflow

## Quick Fix (Fastest)

**Just add a Personal Access Token:**
1. Create PAT with `write:packages` scope
2. Add as secret `GHCR_PAT`
3. Done! ✅

