## Daily Development & Deployment Commands

### __Phase 1: Development Work__

```bash
# Start development session
git checkout dev-branch
git pull origin dev-branch
npm start  # Opens http://localhost:8080
```

__Branch Effects:__

- Working on `dev-branch` ✏️
- `main` and `gh-pages` unchanged

---

### __Phase 2: Commit Your Work__

```bash
# Save your changes
git add .
git commit -m "Your commit message"
git push origin dev-branch
```

__Branch Effects:__

- `dev-branch` updated with new commits ⬆️
- `main` and `gh-pages` unchanged

---

### __Phase 3: Deploy to Production__

```bash
# Deploy when ready
npm run deploy:full
```

__What this does internally:__

```bash
# 1. Switch to main and merge dev-branch
git checkout main
git pull origin main  
git merge dev-branch    # ← dev-branch merged into main

# 2. Push to trigger deployment
git push origin main    # ← Triggers GitHub Actions
```

__Branch Effects:__

- `main` updated with dev-branch changes ⬆️
- GitHub Actions triggered 🚀
- `gh-pages` will be updated with built site (automatic)
- `dev-branch` unchanged

---

### __Phase 4: Return to Development__

```bash
# Switch back to dev-branch for next work session
git checkout dev-branch
```

__Branch Effects:__

- Back on `dev-branch` for next development cycle
- All branches now in sync

---

## Branch Status Summary

| Branch | Purpose | Updated By | Contains | |--------|---------|------------|----------| | `dev-branch` | Development | You manually | Source code (work in progress) | | `main` | Production trigger | `npm run deploy:full` | Source code (production ready) | | `gh-pages` | Live website | GitHub Actions | Built website (HTML/CSS/JS) |

---

## Optional: Delete deploy-branch

```bash
# Delete locally
git branch -d deploy-branch

# Delete from GitHub
git push origin --delete deploy-branch
```

Your new workflow is now: __dev-branch → main → gh-pages (automatic)__