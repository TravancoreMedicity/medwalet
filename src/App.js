import React, { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';




const RootLayouts = lazy(() => import('./Layouts/RootLayouts'))
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Login = lazy(() => import('./Pages/login/Logiin'))
const SearchBar = lazy(() => import('./Components/SearchBar'))
const ParkingType = lazy(() => import('./Pages/Parking/ParkingDetail'))
const DriverMain = lazy(()=>import("./Views/Masters/DriverMaster/DriverMain"))
const Settings = lazy(()=>import("./Modules/Settings/Settings"))
const ZoneMaster = lazy(()=>import("./Views/Masters/ZoneMaster/ZoneMaster"))
const UserMaster =  lazy(()=>import("./Views/Masters/UserMaster/UserMaster"))
const SlotMaster =  lazy(()=>import('./Views/Masters/SlotMaster/SlotMaster'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    children: [],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/Home', element: <RootLayouts />,
        children: [
          { path: 'Dashboard', element: <Dashboard /> },
          { path: 'parkingdetail', element: <ParkingType /> },
          { path: 'search', element: <SearchBar /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: '/User', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <UserMaster /> },
        ],
      },
      {
        path: '/Driver', element: <RootLayouts />,
        children: [
          { path: 'main', element: <DriverMain /> },
        ],
      },
      {
        path: '/Zone', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <ZoneMaster /> },
        ],
      },
      {
        path: '/Slot', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <SlotMaster /> },
        ],
      }
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
