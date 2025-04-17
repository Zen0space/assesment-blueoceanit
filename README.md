# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to Use This Project

### Forking and Installation

1. **Fork the Repository**
   - Visit the GitHub repository page
   - Click the "Fork" button in the top-right corner
   - This creates a copy of the repository in your GitHub account

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/assesment-blueoceanit.git
   cd assesment-blueoceanit
   ```

3. **Install Dependencies**
   npm install

4. **Environment Setup**
   - Create a .env file in the root directory if it doesn't exist
   - Add the following environment variables:

  VITE_API_URL=http://localhost:3000
  VITE_SOCKET_URL=http://localhost:3001
  VITE_APP_NAME=TrainTicket Booking

5. **Start the Development Server**
   npm run dev

6. **Build for Production**
   npm run build

### Project Structure
- src/ - Source code
  - components/ - Reusable UI components
  - pages/ - Page components
  - theme/ - Theme configuration
  - App.tsx - Main application component
  - main.tsx - Entry point


This tutorial section provides clear step-by-step instructions for forking the repository, cloning it locally, installing dependencies, setting up the environment, and running the development server. It also includes information about building for production and a brief overview of the project structure.