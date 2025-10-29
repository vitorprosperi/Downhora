const { AndroidConfig, withAndroidStyles } = require('expo/config-plugins');

const withCustomNavigationBarColor = (config) => {
  return withAndroidStyles(
    config,
    async (config) => {
      // Find "AppTheme" style
      const appTheme = config.modResults.resources.style?.find(
        (style) => style.$.name === `AppTheme`
      );

      // Find item "android:navigationBarColor" in "AppTheme"
      const navigationBarColorItem = appTheme?.item.find(
        (item) => item.$.name === `android:navigationBarColor`
      );

      // If exists, change it's value to "@android:color/transparent"
      if (navigationBarColorItem) {
        navigationBarColorItem._ = `@android:color/transparent`;
      } else {
        // Else create the item
        appTheme?.item.push(
          AndroidConfig.Resources.buildResourceItem({
            name: `android:navigationBarColor`,
            value: `@android:color/transparent`,
          })
        );
      }

      return config;
    }
  );
};

module.exports = withCustomNavigationBarColor;