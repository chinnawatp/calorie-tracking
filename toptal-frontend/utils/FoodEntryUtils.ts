export function hasReachedCalorieLimitPerDay(user, currentCalorie) {
  return currentCalorie >= (user?.calorieLimitPerDay || 0);
}


export function hasReachedPriceLimitPerDay(user, currentPrice) {
  return currentPrice >= (user?.priceLimitPerDay || 0);
}
