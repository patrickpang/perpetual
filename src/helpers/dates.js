import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns/esm/fp'
import { chunk } from 'lodash/fp'

export const defaultDateFormat = format('yyyy-MM-dd')

export const daysInWeek = date =>
  eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) })

export const daysInMonth = date => {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  })
  return chunk(7, days)
}

// TODO: memoize?
