# Customer Portal

A React-based customer portal application with a navigation drawer component based on Figma designs.

## Features

- **Responsive Drawer Navigation**: Expandable/collapsible sidebar with organized sections
- **Modern UI**: Built with Tailwind CSS following Figma design specifications
- **Interactive Components**: Expandable sections for Organization and Personal areas
- **Clean Architecture**: Modular component structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexdubnyak/customer-portal.git
cd customer-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   └── Drawer.jsx          # Main navigation drawer component
├── App.js                  # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

## Components

### Drawer Component

The main navigation component featuring:
- Collapsible/expandable states
- Organized sections (Home, Organization, Personal, Store)
- Interactive expandable menu items
- Footer with copyright and support information

## Technologies Used

- React 18
- Tailwind CSS
- Modern JavaScript (ES6+)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## License

Copyright 2024 Graebert GmbH. All rights reserved.
