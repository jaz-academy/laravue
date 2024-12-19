import { db } from '@db/pages/help-center/db'
import { rest } from 'msw'

export const handlerPagesHelpCenter = [
  rest.get(('/fake/pages/help-center'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ allArticles: db.allArticles, popularArticles: db.popularArticles, keepLearning: db.keepLearning }))
  }),
  rest.get(('/fake/pages/help-center/article'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.articleData))
  }),
]
