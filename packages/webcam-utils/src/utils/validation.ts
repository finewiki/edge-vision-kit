export const validateConstraints = (constraints: MediaStreamConstraints): boolean => {
  return !!(constraints.video && typeof constraints.video === 'object');
};