import "dotenv/config";

export default ({ config }) => ({
  ...config,
  expo: {  
  name: "my-app",
  slug: "my-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: `stytch-ui-${process.env.EXPO_PUBLIC_STYTCH_PUBLIC_TOKEN}`,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: process.env.EXPO_PUBLIC_STYTCH_PACKAGE_NAME,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: process.env.EXPO_PUBLIC_STYTCH_PACKAGE_NAME
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
    }
  }
}
});
