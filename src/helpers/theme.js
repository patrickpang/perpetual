import { sample } from 'lodash/fp'

export const themes = {
  green: ['#11998e', '#38ef7d'],
  violet: ['#834d9b', '#d04ed6'],
  orange: ['#fc4a1a', '#f7b733'],
  blue: ['#5b86e5', '#36d1dc'],
  grey: ['#2c3e50', '#bdc3c7'],
}

export const randomTheme = () => sample(Object.keys(themes))
