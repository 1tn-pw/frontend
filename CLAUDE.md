# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based frontend for 1tn.pw, a URL shortening service. The application consists of two main pages:
- Home page (`/`) - URL shortening interface where users can input URLs to shorten
- Redirect page (`/*`) - Handles redirects for shortened URLs by fetching long URLs from the API

## Commands

### Development
- `npm start` or `npm run dev` - Start development server
- `npm run build` - Build for production using react-app-rewired
- `npm test` - Run Jest tests

### Task Runner (Taskfile.yml)
- `task test` - Run npm test
- `task build` - Build container images
- `task deploy` - Deploy to Kubernetes
- `task build-deploy` - Build and deploy in one command

## Architecture

### Core Dependencies
- **React 18** with TypeScript
- **React Router v7** for routing
- **Ant Design (antd)** for UI components
- **Radix UI** for additional components and theming
- **OIDC Authentication** via react-oidc-context with Keycloak
- **Feature Flags** via @flags-gg/react-library

### Authentication
Uses OIDC/OAuth2 with Keycloak:
- Authority: `https://keys.chewedfeed.com/realms/1tn-pw`
- Client ID: `dashboard`
- Configuration in `src/app.config.tsx`

### Routing Strategy
Simple two-route system in `src/components/SiteRouter/index.tsx`:
- Root path (`/`) renders Shrink component
- Wildcard (`*`) renders Redirect component with URL parameter

### API Integration
- **Shortening API**: `https://api.1tn.pw/create` (POST)
- **Redirect API**: `https://api.1tn.pw/{shortURL}` (GET)
- Note: Redirector component has localhost override for development

### Build Configuration
- Uses `react-app-rewired` with custom config-overrides.js
- Jest configured for TypeScript with CSS module support
- Transforms @flags-gg/react-library in Jest transformIgnorePatterns

### Deployment
Containerized deployment with:
- Multi-arch builds (amd64/arm64)
- Kubernetes manifests in `k8s/`
- Container registry: `containers.chewed-k8s.net/1tn-pw/frontend`

## Key Components

### Shrink Component (`src/pages/Shrink/index.tsx`)
Main URL shortening interface with:
- URL validation (prevents circular shortening)
- Auto-protocol prefix (adds https:// if missing)
- Copy-to-clipboard functionality
- Error handling with retry mechanism

### Redirect Component (`src/pages/Redirector/index.tsx`)
Handles shortened URL redirects:
- Fetches long URL and metadata from API
- Updates page meta tags (title, description, favicon)
- Performs client-side redirect

### Layout Components
- `SiteHeader` - Navigation header
- `Layout` - Page layout wrapper with header/content/footer structure
- Uses Radix UI Grid and Flex for responsive layout

## Development Notes

### Testing
- Jest with TypeScript support
- JSDOM environment for React components
- CSS modules mocked with identity-obj-proxy
- Test files: `*.test.ts|tsx` or `*/__tests__/*`

### Feature Flags
Feature flags configured with specific project/agent/environment IDs in App.tsx

### Environment Configuration
Development vs production API endpoints handled in Redirector component (currently hardcoded localhost override)