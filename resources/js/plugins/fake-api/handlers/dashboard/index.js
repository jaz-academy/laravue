import { db } from '@/plugins/fake-api/handlers/dashboard/db'
import { rest } from 'msw'

export const handlerDashboard = [
  rest.get('/fake/dashboard/analytics/projects', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.analytics))
  }),
]
