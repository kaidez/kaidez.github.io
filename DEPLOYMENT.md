# Deployment Workflow Documentation

## Overview

This repository uses a structured branching strategy with automated deployment via GitHub Actions. The workflow ensures clean separation between development, deployment, and production code.

## Branch Structure

```
dev-branch (development) 
    ↓ (merge when ready)
main (production/single source of truth)
    ↓ (automated via GitHub Actions)
gh-pages (GitHub Pages source - built site)
```

## Workflow Process

### 1. Development Phase
- Work on `dev-branch`
- Make all your changes, commits, and testing here
- This is your main development branch

### 2. Deployment Phase
When you're ready to deploy:

```bash
# Option A: Use npm scripts (recommended)
npm run deploy:full

# Option B: Manual process
git checkout main
git pull origin main
git merge dev-branch
git push origin main
```

### 3. Automated Deployment
When you push to `main`, GitHub Actions automatically:

1. **Builds** your 11ty site with production optimizations
2. **Deploys** to GitHub Pages (gh-pages branch)
3. **Reports** deployment status

## NPM Scripts

### Development Scripts
- `npm start` - Start local development server
- `npm run build` - Build site for development
- `npm run build:prod` - Build site for production

### Deployment Scripts
- `npm run deploy:dev` - Switch to and update dev-branch
- `npm run deploy:merge` - Merge dev-branch into main
- `npm run deploy:push` - Push main (triggers deployment)
- `npm run deploy:full` - Complete merge and push process

### Legacy Script
- `npm run deploy` - Old gh-pages deployment (for manual use)

## GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) runs when:
- You push to `main`
- You manually trigger it from the Actions tab

### What it does:
1. **Checks out `main`** branch
2. **Installs Node.js and dependencies** with caching for faster builds
3. **Runs production build** (`npm run build:prod`) with optimizations
4. **Sets up GitHub Pages** configuration
5. **Uploads built site** as deployment artifact
6. **Deploys to GitHub Pages** using official GitHub actions
7. **Reports deployment status**

### Technical Details:
- **Uses official GitHub actions**: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`
- **Requires permissions**: `pages: write` and `id-token: write` 
- **Uses deployment environment**: `github-pages` for proper deployment tracking
- **Preserves HTTPS enforcement**: Won't reset your repository settings
- **No gh-pages branch needed**: Deploys via artifact upload system

## Typical Development Cycle

1. **Start development**:
   ```bash
   git checkout dev-branch
   git pull origin dev-branch
   npm start  # Start local dev server
   ```

2. **Make changes**:
   - Edit files, write posts, update code
   - Test locally at http://localhost:8080

3. **Commit your work**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin dev-branch
   ```

4. **Deploy when ready**:
   ```bash
   npm run deploy:full
   ```

5. **Verify deployment**:
   - Check GitHub Actions tab for build status
   - Visit https://kaidez.github.io to see live site

## Branch Purposes

### `dev-branch`
- **Purpose**: Active development
- **Use**: Daily work, experiments, draft posts
- **Deploy**: Never directly deployed

### `main`
- **Purpose**: Single source of truth (production-ready code)
- **Use**: Receives merges from dev-branch, triggers deployment
- **Deploy**: Automatically triggers GitHub Actions when updated

### `gh-pages` *(No longer used)*
- **Previous purpose**: GitHub Pages source branch
- **Current status**: Not created or used by new deployment method
- **Note**: Can be safely deleted if it exists from previous deployments

## Troubleshooting

### Deployment Failed
1. Check GitHub Actions tab for error details
2. Ensure all dependencies are in `package.json`
3. Verify 11ty builds successfully locally with `npm run build:prod`

### Site Not Updating
1. Confirm GitHub Pages is set to deploy from `gh-pages` branch
2. Check that GitHub Actions completed successfully
3. Clear browser cache and wait a few minutes for CDN propagation

### Branch Issues
1. If branches get out of sync, you can manually sync:
   ```bash
   git checkout dev-branch
   git pull origin main  # Sync with production code if needed
   ```

## GitHub Pages Configuration

**IMPORTANT**: Your repository's GitHub Pages settings must be configured as:
- **Source**: GitHub Actions ← **Must be set to this**
- ~~**Branch**: `gh-pages`~~ ← **No longer used**
- ~~**Folder**: `/ (root)`~~ ← **No longer needed**

### How to Change Settings:
1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages**  
3. Under **Source**, select **"GitHub Actions"**
4. Enable **"Enforce HTTPS"** (this setting will now be preserved)

### Why This Change:
- **Preserves HTTPS enforcement**: The old method reset this setting on each deploy
- **No branch management**: No need to manage a separate `gh-pages` branch
- **Faster deployments**: Direct artifact upload is more efficient
- **Better security**: Uses OIDC tokens instead of repository tokens

## Benefits of This Workflow

1. **Clean Development**: Work freely on dev-branch without affecting production
2. **Automated Deployment**: No manual build/deploy steps
3. **Single Source of Truth**: Main branch contains production-ready code
4. **Easy Rollback**: Can revert to previous main branch commits if needed
5. **CI/CD Integration**: Automatic testing and deployment on every release
6. **HTTPS Enforcement Preserved**: Settings won't be reset on each deployment
7. **Official GitHub Actions**: Uses supported, maintained deployment methods
8. **Faster Deployments**: Direct artifact upload without branch management

## Quick Reference

| Action | Command |
|--------|---------|
| Start development | `git checkout dev-branch && npm start` |
| Deploy changes | `npm run deploy:full` |
| Check build status | Visit GitHub Actions tab |
| View live site | https://kaidez.github.io |

---

**Note**: Always work on `dev-branch` and use the deployment scripts to promote changes to production. Never directly push to `gh-pages` branch, and only push to `main` through the deployment process.
