
export const consecutiveSuccessFormula = (consecutiveSuccess: number) => {

  const baseExponent = 1.2
  const endExponent = 2
  const exponent = lerp(baseExponent, endExponent, Math.max(0, consecutiveSuccess - 3) / 18)

  return Math.floor(Math.pow(Math.max(0, consecutiveSuccess - 2), exponent))
}

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
}



