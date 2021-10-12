export function hasReachedCalorieLimitPerDay(user, currentCalorie) {
  return currentCalorie >= (user?.calorieLimitPerDay || 0);
}
