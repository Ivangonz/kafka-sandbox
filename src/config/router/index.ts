import HomePage from '../../views/Home'
import TestPage from '../../views/Test'


export interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
}


export const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        exact: true
    },
    {
        path: '/test',
        name: 'Details',
        component: TestPage,
        exact: false
    },
 
]


