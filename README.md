# TimeFrameSwitcher

# Overview

This project is a React Native application that allows users to navigate between different time views (Day, Week, and Month) and displays a list of events or tasks for each day. The user can interact with a calendar to view events, which are marked with dots, and swipe gestures are implemented to switch between views.

## Features

- Navigate between different timeframes (Day, Week, Month).
- View tasks/events for specific dates.
- Swipe gestures to switch between views.
- Real-time event fetching using React Query.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- React Native CLI
- Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-name.git
   ```

2. Navigate into the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

For **Android**, connect a device or start an emulator and run:

```bash
npx react-native run-android
```

For **iOS**, you need a macOS machine:

```bash
npx react-native run-ios
```

### Building APK

1. Navigate to the `android` folder:

   ```bash
   cd android
   ```

2. Build a release APK:

   ```bash
   ./gradlew assembleRelease
   ```

3. Once the build completes, you can find the APK in `android/app/build/outputs/apk/release/`.

### Development Build

For development builds, you can use:

```bash
npx react-native run-android --variant=debug
```

or directly from the Android folder:

```bash
cd android
./gradlew assembleDebug
```

## Future Enhancements

- Add different color dots for different event types.
- Improve performance for transtion bettween view by using flatlist to switch bettwen them.

## Additional Notes

- This project uses **React Query** for data fetching and **react-native-reanimated** for animations.
- Ensure that your Android SDK is set up correctly before building or running the app.
