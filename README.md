# MediScan AI - Medical Bill Analysis Platform

A HIPAA-compliant edge-based medical billing analysis platform that empowers patients to identify billing errors and potential fraud in their medical documents.

## 🏥 Features

- **Secure Document Upload**: Drag-and-drop interface for medical bills (PDF, JPG, PNG)
- **Local OCR Processing**: Edge computing approach - all data stays on device
- **AI-Powered Analysis**: Medical code detection and validation
- **Patient-Friendly Explanations**: Complex medical terminology made simple
- **Error Detection**: Visual flagging system for potential billing issues
- **Dispute Generation**: Automated dispute letter templates
- **Analytics Dashboard**: Track savings and billing patterns
- **HIPAA Compliance**: Healthcare-grade security and privacy

## 🚀 Technology Stack

- **Frontend**: React Native with Expo SDK 52
- **Navigation**: Expo Router 4.0 with tab-based architecture
- **Styling**: StyleSheet with healthcare-focused design system
- **Icons**: Lucide React Native for consistent iconography
- **Fonts**: Inter font family for medical-grade readability
- **Platform**: Cross-platform (iOS, Android, Web)

## 📱 Project Structure

```
mediscan-ai/
├── app/                    # Expo Router routes
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Login screen
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   ├── cards/            # Card components
│   └── layout/           # Layout components
├── constants/            # Design system constants
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── assets/              # Static assets
└── types/               # TypeScript definitions
```

## 🛠️ Installation

1. **Prerequisites**
   ```bash
   node --version  # >= 18.0.0
   npm install -g expo-cli@latest
   ```

2. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd mediscan-ai
   npm install
   ```

3. **Development**
   ```bash
   # Start development server
   npm start

   # Platform-specific
   npm run ios
   npm run android  
   npm run web
   ```

## 🔐 HIPAA Compliance Features

- **Local Processing**: All PHI processing happens on-device
- **AES-256 Encryption**: Secure data storage simulation
- **Session Management**: Automatic timeouts (30 minutes)
- **Audit Logging**: Comprehensive activity tracking
- **Privacy Messaging**: Clear data handling communication
- **Biometric Auth**: Simulation for mobile platforms

## 🎨 Design System

- **Colors**: Healthcare blue/green palette for trust
- **Typography**: Inter font family optimized for readability
- **Spacing**: 8px grid system for consistency
- **Accessibility**: High contrast ratios (WCAG AA compliance)
- **Touch Targets**: Minimum 44pt for accessibility

## 📋 Available Scripts

```bash
npm start          # Start Expo development server
npm run dev        # Start with dev client
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 🏗️ Build & Deploy

```bash
# Web deployment
npm run build:web

# Mobile builds (requires EAS CLI)
npm run build:android
npm run build:ios
```

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 Platform Support

- **iOS**: 13.0+
- **Android**: API 21+ (Android 5.0)
- **Web**: Modern browsers with ES2018 support

## 🔒 Security Considerations

- Local-first architecture
- No external API dependencies for PHI
- Secure session management
- Privacy-focused design patterns
- HIPAA-compliant data handling

## 🤝 Contributing

1. Follow the established code style
2. Ensure TypeScript compliance
3. Test across all platforms
4. Follow HIPAA guidelines for any health data handling

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a demonstration platform for hackathon purposes. For production use, ensure proper HIPAA compliance assessment and security auditing.