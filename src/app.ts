import express, {Application} from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/User/user.routes'
import { adminRoutes } from './app/modules/Admin/admin.routes'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// api endpoint
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)

export default app;