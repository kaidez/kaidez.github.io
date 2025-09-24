# Deployment Workflow Documentation

## Overview

This repository uses a structured branching strategy with automated deployment via GitHub Actions. The workflow ensures clean separation between development, deployment, and production code.

## Branch Structure

```
dev-branch (development) 
    ↓ (merge when ready)
deploy-branch (staging/deployment trigger)
    ↓ (automated via GitHub Actions)
gh-pages (GitHub Pages source)
main (production/archive)
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
git checkout deploy-branch
git pull origin deploy-branch
git merge dev-branch
git push origin deploy-branch
```

### 3. Automated Deployment
When you push to `deploy-branch`, GitHub Actions automatically:

1. **Builds** your 11ty site with production optimizations
2. **Deploys** to GitHub Pages (gh-pages branch)
3. **Updates** main branch with the latest code
4. **Reports** deployment status

## NPM Scripts

### Development Scripts
- `npm start` - Start local development server
- `npm run build` - Build site for development
- `npm run build:prod` - Build site for production

### Deployment Scripts
- `npm run deploy:dev` - Switch to and update dev-branch
- `npm run deploy:merge` - Merge dev-branch into deploy-branch
- `npm run deploy:push` - Push deploy-branch (triggers deployment)
- `npm run deploy:full` - Complete merge and push process

### Legacy Script
- `npm run deploy` - Old gh-pages deployment (for manual use)

## GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) runs when:
- You push to `deploy-branch`
- You manually trigger it from the Actions tab

### What it does:
1. Checks out `deploy-branch`
2. Installs Node.js and dependencies
3. Runs production build (`npm run build:prod`)
4. Deploys built site to GitHub Pages
5. Merges `deploy-branch` into `main`
6. Reports deployment status

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

### `deploy-branch`
- **Purpose**: Deployment trigger
- **Use**: Only receives merges from dev-branch
- **Deploy**: Automatically triggers GitHub Actions

### `main`
- **Purpose**: Production archive
- **Use**: Automatically updated by GitHub Actions
- **Deploy**: Read-only, represents live site code

### `gh-pages`
- **Purpose**: GitHub Pages source
- **Use**: Automatically managed by GitHub Actions
- **Deploy**: Serves the actual website

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
   git pull origin main  # Sync with production if needed
   ```

## GitHub Pages Configuration

Ensure your repository's GitHub Pages settings are configured to:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages`
- **Folder**: `/ (root)`

## Benefits of This Workflow

1. **Clean Development**: Work freely on dev-branch without affecting production
2. **Automated Deployment**: No manual build/deploy steps
3. **Production Archive**: Main branch always reflects live site
4. **Easy Rollback**: Can revert to previous deploy-branch commits if needed
5. **CI/CD Integration**: Automatic testing and deployment on every release

## Quick Reference

| Action | Command |
|--------|---------|
| Start development | `git checkout dev-branch && npm start` |
| Deploy changes | `npm run deploy:full` |
| Check build status | Visit GitHub Actions tab |
| View live site | https://kaidez.github.io |

---

**Note**: Always work on `dev-branch` and use the deployment scripts to promote changes to production. Never directly push to `main` or `gh-pages` branches.
