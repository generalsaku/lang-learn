export const shuffle = <T>(array: T[]) => {
  return array.reduce(
    (acc, _, i) => {
        const random = Math.floor(Math.random() * (acc.length - i)) + i;
        [acc[i], acc[random]] = [acc[random], acc[i]]
        return acc;
    },
    [...array]
  )
}
