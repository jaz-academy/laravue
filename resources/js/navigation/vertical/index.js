import academy from './academy'
import dashboard from './dashboard'
import finance from './finance'
import profile from './profile'
import appsAndPages from './x-apps-and-pages'
import charts from './x-charts'
import xDashboard from './x-dashboard'
import forms from './x-forms'
import others from './x-others'
import uiElements from './x-ui-elements'

const currentUser = useCookie('userData').value
const userAccess = (currentUser?.access || '').split(',').map(item => item.trim())

let navigationRoutes
if (currentUser.role === 5) {
  navigationRoutes = [...dashboard, ...profile, ...academy, ...finance, ...xDashboard, ...uiElements, ...forms, ...charts, ...others, ...appsAndPages]
} else {
  navigationRoutes = [...dashboard, ...profile, ...academy, ...finance]
}

export default navigationRoutes
