module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Removed deprecated 'expo-router/babel' - now included in babel-preset-expo
      // Reanimated plugin needs to be listed last
      'react-native-reanimated/plugin',
    ],
  };
};

