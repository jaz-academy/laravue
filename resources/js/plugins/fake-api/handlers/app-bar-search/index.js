import { db } from '@db/app-bar-search/db'
import is from '@sindresorhus/is'
import { rest } from 'msw'

export const handlerAppBarSearch = [
  // Get Search Items
  rest.get('/fake/app-bar/search', (req, res, ctx) => {
    const q = req.url.searchParams.get('q') ?? ''
    const searchQuery = is.string(q) ? q : undefined
    const queryLowered = (searchQuery ?? '').toString().toLowerCase()
    const filteredSearchData = []

    db.searchItems.forEach(item => {
      if (item.children) {
        const matchingChildren = item.children.filter(child => child.title.toLowerCase().includes(queryLowered))
        if (matchingChildren.length > 0) {
          const parentCopy = { ...item }
          if (matchingChildren.length > 5)
            parentCopy.children = matchingChildren.slice(0, 5)
          else
            parentCopy.children = matchingChildren
          filteredSearchData.push(parentCopy)
        }
      }
    })

    // ℹ️ Enable this comment if you want to limit length of search results.
    // if (filteredSearchData.length > 1) {
    //   filteredSearchData.forEach((item, index) => {
    //     if (item.children.length > 3)
    //       filteredSearchData[index].children.splice(0, 3)
    //   })
    // }
    return res(ctx.status(200), ctx.json([...filteredSearchData]))
  }),
]
