import { db } from '@db/pages/datatable/db'
import { rest } from 'msw'

export const handlerPagesDatatable = [
  rest.get(('/fake/pages/datatable'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.salesDetails))
  }),
]
