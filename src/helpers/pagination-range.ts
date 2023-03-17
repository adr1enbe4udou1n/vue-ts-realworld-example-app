const getRange = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(null)
    .map((v, i) => i + start)
}

const usePagesBuilder = (currentPage: number, pageCount: number) => {
  let delta: number

  if (pageCount <= 7) {
    delta = 7
  } else {
    delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  }

  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1
    range.end += 1
  }

  const pages: number[] =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
      : getRange(1, Math.min(pageCount, delta + 1))

  const withDots = (value: number, pair: (number | string)[]) =>
    pages.length + 1 !== pageCount ? pair : [value]

  let paginator: (number | string)[] = []

  if (pages[0] !== 1) {
    paginator = withDots(1, [1, "..."])
  }

  paginator = paginator.concat(pages)

  if (pages[pages.length - 1] < pageCount) {
    paginator = paginator.concat(withDots(pageCount, ["...", pageCount]))
  }

  return paginator
}

export { usePagesBuilder }
