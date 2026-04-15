# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Workspace

This is a UX/UI design workspace owned by Tyron, a designer who uses Claude Code to build websites, apps, and digital products. Projects here are standalone HTML/CSS/JS — no build tools, no frameworks, no package managers.

## How to Preview

Open any `.html` file in the browser:
```bash
powershell -Command "Start-Process '<full-path-to-file>.html'"
```

## Project Structure

Each project lives in its own folder with self-contained HTML, CSS, and JS files. No shared dependencies between projects.

- `bright-swimwear-replica/` — Shopify storefront replica (HTML + CSS)
- `tic-tac-toe.html` — standalone single-file game

## Collaboration Style

- Tyron provides creative direction and vision; Claude handles technical execution.
- Output should be clean, efficient, and production-quality — no showy code or unnecessary flourishes.
- Prioritize speed. Ship what's asked for, nothing extra.
- Use plain HTML/CSS/JS unless a framework is specifically requested.
- When building web pages, use Google Fonts and inline SVG icons rather than external icon libraries.

## Git Workflow

- Commit work to git regularly with clean, descriptive commit messages.
- Push to GitHub after meaningful progress — never let work sit uncommitted.
- Commit at natural checkpoints: after completing a feature, finishing a section, or making a round of edits.
- Do not batch everything into one giant commit at the end. Small, clear commits so we can track and roll back if needed.
