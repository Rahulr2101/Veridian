const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enhance the default config with NativeWind settings
module.exports = withNativeWind(config, { input: './app/globals.css' });
