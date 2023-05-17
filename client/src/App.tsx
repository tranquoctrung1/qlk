import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './layout/layout';
import DashBoardPage from './pages/dashboard';
import ErrorPage from './pages/error';
import ExchangeHistoryPage from './pages/exchangeHistory';
import ExportHistoryPage from './pages/exportHistory';
import LoginPage from './pages/login';
import UserPage from './pages/user';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <DashBoardPage />,
                },
                {
                    path: '/export',
                    element: <ExportHistoryPage />,
                },
                {
                    path: '/exchange',
                    element: <ExchangeHistoryPage />,
                },
                {
                    path: '/user',
                    element: <UserPage />,
                },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '*',
            element: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
