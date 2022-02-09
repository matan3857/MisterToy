import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyApp } from './pages/ToyApp.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'

const routes = [{
        path: '/',
        component: HomePage,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/toy/dashboard',
        component: Dashboard,
    },
    {
        path: '/edit/:toyId',
        component: ToyEdit,
    },
    {
        path: '/details/:toyId',
        component: ToyDetails,
    },
    {
        path: '/about',
        component: AboutUs,
    }
]

export default routes;