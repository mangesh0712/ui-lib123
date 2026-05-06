# CLAUDE.md — Working Rules

## Commits

**Rule:** After completing each feature or logical piece of work, create a commit with a clear message.

- One component = one commit (or group related fixes together)
- Config changes = one commit  
- Tests are included in the component commit
- Use Conventional Commits format: `feat(component): description` or `fix(component): description`

**Example:**
```bash
git add .
git commit -m "feat(button): add loading state and spinner variant"
```

This way, when you review the git history later, you can see exactly what was built in each step and check out any commit to inspect the code.

---

**Note:** All project architecture, decisions, and documentation are in [ARCHITECTURE.md](./ARCHITECTURE.md).
