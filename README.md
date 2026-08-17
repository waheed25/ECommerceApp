# React Native E-Commerce App

A cross-platform e-commerce application for iOS and Android, built with React Native and TypeScript. The project demonstrates modular feature organization, predictable state management, API caching, persistence, internationalization, and a reusable UI system.

<p align="center">
  <img src="/src/Images/screenshot-0.png" width="30%" alt="Product browsing screen" />
  <img src="/src/Images/screenshot-1.png" width="30%" alt="Product details screen" />
  <img src="/src/Images/screenshot-2.png" width="30%" alt="Shopping experience screen" />
</p>

## Highlights

- Product browsing and detail flows backed by an API
- RTK Query for data fetching and caching
- Redux Toolkit with persisted application state
- React Navigation for cross-platform navigation
- React Native Paper and reusable themed components
- Internationalization with i18next
- MMKV-backed local persistence
- Jest and React Native Testing Library setup

## Architecture

The `src/` directory separates screens, components, navigation, services, state, hooks, theme, translations, and tests. This keeps UI, networking, and platform concerns independently maintainable.

## Technology

- React Native
- TypeScript
- Redux Toolkit and RTK Query
- React Navigation
- React Native Paper
- MMKV
- i18next
- Jest and React Native Testing Library

## Getting started

### Requirements

- Node.js 16 or newer
- A configured React Native development environment
- Xcode and CocoaPods for iOS development
- Android Studio and the Android SDK for Android development

### Install and run

```sh
npm install
npm start
```

In a separate terminal, run the target platform:

```sh
npm run ios
npm run android
```

## Quality checks

```sh
npm run type-check
npm run lint
npm test
```

## Project structure

```text
src/
├── Components/
├── Hooks/
├── Navigation/
├── Screens/
├── Services/
├── Store/
├── Theme/
├── Translations/
└── __tests__/
```
