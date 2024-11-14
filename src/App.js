import React, { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const RootLayouts = lazy(() => import('./Layouts/RootLayouts'))
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'))
const Home = lazy(() => import('./Pages/Home'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayouts />,
    children: [],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/Home', element: <Home />,
        children: [
          { path: 'Dashboard', element: <Dashboard /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  return (
    <Suspense fallback={<div>loding</div>} >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
