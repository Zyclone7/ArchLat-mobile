# Web to Mobile Application Converter

Convert your web application into a native mobile app using Capacitor.js.

## Screenshots

### Web Application
![Home Screen](./docs/screenshots/home-screen.png)
*Main dashboard with navigation*

![Reader Interface](./docs/screenshots/reader-view.png)
*E-reader functionality*

### Mobile Views
![Android App](./docs/screenshots/android-view.png)
*Android native experience*

![iOS App](./docs/screenshots/ios-view.png)
*iOS native experience*

## Technology Stack

### Core Technologies
- **Capacitor.js (v6.1.1)**: Mobile application framework
- **React (v18.3.1)**: UI framework
- **React Router (v6.28.0)**: Navigation
- **Redux Toolkit (v2.5.0)**: State management

### UI Components & Styling
- **Flowbite (v2.5.2)**: UI component library
- **Framer Motion (v11.15.0)**: Animation library
- **HeroIcons & Lucide React**: Icon libraries
- **React Icons**: Additional icon sets

### Additional Features
- **React Reader**: E-reader functionality
- **React Toastify**: Toast notifications
- **Axios**: HTTP client

## Prerequisites

- Node.js (v14 or higher)
- npm/yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/your-project-name.git

# Navigate to project directory
cd your-project-name

# Install dependencies
npm install

# Add Capacitor to your project
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialize Capacitor
npx cap init [appName] [appId]

# Build your web app
npm run build

# Add platforms
npx cap add android
npx cap add ios

# Open native IDEs
npx cap open android
npx cap open ios
```

## Project Structure

```
your-project-name/
├── src/                # Web application source code
├── public/            # Static assets
├── android/           # Android platform folder
├── ios/              # iOS platform folder
├── docs/             # Documentation
│   └── screenshots/  # Application screenshots
├── capacitor.config.ts # Capacitor configuration
└── README.md         # Documentation
```

## Configuration

### Capacitor Configuration (capacitor.config.ts)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Your App Name',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build web application
npm run sync     # Sync web code with native platforms
```

## Platform-Specific Guides

### Android
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- Required Android Studio version: Latest
- Minimum SDK: 22
- Target SDK: 33

### iOS
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- Required Xcode version: 14+
- Minimum deployment target: iOS 13

## Updating

To update native platform implementations:

```bash
# Build your web app
npm run build

# Update native platforms
npx cap sync
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Support

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [GitHub Issues](https://github.com/yourusername/your-project-name/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)
