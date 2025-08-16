// Configuration par scénarios (sans if)
export const CAROUSEL_CONFIG = {
  // Scénarios par nombre d'images
  single: { speed: 0, visibleItems: 1, shouldShow: false, type: "static" },
  empty: { speed: 0, visibleItems: 0, shouldShow: false, type: "empty" },

  // Scénarios responsive pour 2 images
  twoImagesMobile: {
    speed: 15,
    visibleItems: 1,
    shouldShow: true,
    type: "carousel",
  },
  twoImagesTablet: {
    speed: 20,
    visibleItems: 1,
    shouldShow: true,
    type: "carousel",
  },
  twoImagesDesktop: {
    speed: 0,
    visibleItems: 2,
    shouldShow: false,
    type: "static",
  },

  // Scénarios responsive pour 3 images
  threeImagesMobile: {
    speed: 20,
    visibleItems: 2,
    shouldShow: true,
    type: "carousel",
  },
  threeImagesTablet: {
    speed: 25,
    visibleItems: 2,
    shouldShow: true,
    type: "carousel",
  },
  threeImagesDesktop: {
    speed: 0,
    visibleItems: 3,
    shouldShow: false,
    type: "static",
  },

  // Scénarios responsive pour 4+ images
  multipleMobile: {
    speed: 20,
    visibleItems: 2,
    shouldShow: true,
    type: "carousel",
  },
  multipleTablet: {
    speed: 25,
    visibleItems: 3,
    shouldShow: true,
    type: "carousel",
  },
  multipleDesktop: {
    speed: 30,
    visibleItems: 4,
    shouldShow: true,
    type: "carousel",
  },
};

// Mapping des scénarios
const SCENARIO_MAPPING = {
  0: "empty",
  1: "single",

  2: {
    mobile: "twoImagesMobile",
    tablet: "twoImagesTablet",
    desktop: "twoImagesDesktop",
  },

  3: {
    mobile: "threeImagesMobile",
    tablet: "threeImagesTablet",
    desktop: "threeImagesDesktop",
  },

  multiple: {
    mobile: "multipleMobile",
    tablet: "multipleTablet",
    desktop: "multipleDesktop",
  },
};

export const getCarouselConfig = (images, screenSize) => {
  const imageCount = images?.length || 0;

  // Cas spéciaux (0 ou 1 image)
  if (imageCount <= 1) {
    return CAROUSEL_CONFIG[SCENARIO_MAPPING[imageCount]];
  }

  // 2 images = mapping par écran
  if (imageCount === 2) {
    const screenType = screenSize.isMobile
      ? "mobile"
      : screenSize.isTablet
      ? "tablet"
      : "desktop";
    const configKey = SCENARIO_MAPPING[2][screenType];
    return CAROUSEL_CONFIG[configKey];
  }

  // 3 images = mapping par écran
  if (imageCount === 3) {
    const screenType = screenSize.isMobile
      ? "mobile"
      : screenSize.isTablet
      ? "tablet"
      : "desktop";
    const configKey = SCENARIO_MAPPING[3][screenType];
    return CAROUSEL_CONFIG[configKey];
  }

  // 4+ images = toujours carousel responsive
  const screenType = screenSize.isMobile
    ? "mobile"
    : screenSize.isTablet
    ? "tablet"
    : "desktop";
  const configKey = SCENARIO_MAPPING.multiple[screenType];
  return CAROUSEL_CONFIG[configKey];
};
