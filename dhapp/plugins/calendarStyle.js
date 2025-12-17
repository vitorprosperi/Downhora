const { withAndroidStyles } = require("@expo/config-plugins");

const withCustomStyles = (config) => {
  return withAndroidStyles(config, async (config) => {
    config.modResults = applyCustomStyles(config.modResults);
    return config;
  });
};

function applyCustomStyles(styles) {
  // Add items to the App Theme
  const appTheme = styles.resources.style.find(
    (style) => style.$.name === "AppTheme",
  );
  if (appTheme) {
    appTheme.$.parent = "Theme.Material3.DayNight.NoActionBar"; // or "Theme.EdgeToEdge.Material3"
    appTheme.item.push({
      _: "@style/AppCalendar",
      $: { name: "materialCalendarTheme" },
    });
  }

  // Add new style definition
  styles.resources.style.push({
    $: {
      name: "AppCalendar",
      parent: "ThemeOverlay.Material3.MaterialCalendar",
    },
  });

  return styles;
}

module.exports = withCustomStyles;