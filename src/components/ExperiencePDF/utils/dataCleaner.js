/**
 * Nettoie et valide les données d'expériences pour le PDF
 * @param {Array} experiences - Liste des expériences brutes
 * @returns {Array} - Liste des expériences nettoyées et validées
 */
export const cleanExperiencesData = (experiences) => {
  if (!Array.isArray(experiences)) {
    return [];
  }

  return experiences
    .filter((exp) => isValidExperience(exp))
    .map((exp) => normalizeExperience(exp));
};

/**
 * Vérifie si une expérience est valide
 * @param {Object} exp - Expérience à valider
 * @returns {boolean} - True si valide
 */
const isValidExperience = (exp) => {
  return (
    exp &&
    exp.company &&
    typeof exp.company === "string" &&
    exp.company.trim() &&
    exp.start_date
  );
};

/**
 * Normalise une expérience pour le PDF
 * @param {Object} exp - Expérience à normaliser
 * @returns {Object} - Expérience normalisée
 */
const normalizeExperience = (exp) => ({
  ...exp,
  company: exp.company.trim(),
  description: normalizeDescription(exp.description),
  periods: normalizePeriods(exp.periods),
  stacks: normalizeStacks(exp.stacks),
});

/**
 * Normalise la description
 * @param {string} description - Description brute
 * @returns {string|null} - Description normalisée
 */
const normalizeDescription = (description) => {
  return description && typeof description === "string"
    ? description.trim()
    : null;
};

/**
 * Normalise les périodes
 * @param {Array} periods - Périodes brutes
 * @returns {Array} - Périodes normalisées
 */
const normalizePeriods = (periods) => {
  if (!Array.isArray(periods)) {
    return [];
  }

  return periods.filter(
    (period) =>
      period &&
      period.description &&
      typeof period.description === "string" &&
      period.description.trim()
  );
};

/**
 * Normalise les technologies
 * @param {Array} stacks - Technologies brutes
 * @returns {Array} - Technologies normalisées
 */
const normalizeStacks = (stacks) => {
  if (!Array.isArray(stacks)) {
    return [];
  }

  return stacks.filter(
    (stack) => stack && typeof stack === "string" && stack.trim()
  );
};
