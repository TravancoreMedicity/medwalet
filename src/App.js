import React, { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Progress from './Components/Progress';
import InitialLoadingSkeleton from './Components/InitialLoadingSkeleton';
import CircularProgressThickness from './Components/CircularProgress';




const RootLayouts = lazy(() => import('./Layouts/RootLayouts'))
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Login = lazy(() => import('./Pages/login/Logiin'))
const SearchBar = lazy(() => import('./Components/SearchBar'))
const UserRightMaster = lazy(() => import("./Views/Masters/UserRightMaster/UserRightMaster"))
const Settings = lazy(() => import("./Modules/Settings/Settings"))
const ZoneMaster = lazy(() => import("./Views/Masters/ZoneMaster/ZoneMaster"))
const UserMaster = lazy(() => import("./Views/Masters/UserMaster/UserMaster"))
const SlotMaster = lazy(() => import('./Views/Masters/SlotMaster/SlotMaster'));
const DriverMaster = lazy(() => import('./Views/Masters/DriverMaster/DriverMaster'));
const ReportsMain = lazy(() => import('./Views/Reports/ReportsMain'));
const ReportVehicleRegistration = lazy(() => import('./Views/Reports/ReportVehicleRegistration'));
const AttendanceReports = lazy(() => import('./Views/Reports/AttendanceReports'));
const DriverRevenueReports = lazy(() => import('./Views/Reports/DriverRevenueReports'));
const MobileAttendance = lazy(() => import('./Views/Masters/DriverMaster/MobileAttendance'));



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
          { path: 'Dashboard', element: <Suspense fallback={<InitialLoadingSkeleton />}><Dashboard /></Suspense> },
          { path: 'search', element: <Suspense fallback={<div>loding....</div>}> <SearchBar /></Suspense> },
          { path: 'settings', element: <Suspense fallback={<div>loding....</div>}> <Settings /></Suspense> },
        ],
      },
      {
        path: '/User', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <Suspense fallback={<div>loding....</div>}> <UserMaster /></Suspense> },
        ],
      },
      {
        path: '/UserRight', element: <RootLayouts />,
        children: [
          { path: 'main', element: <Suspense fallback={<div>loding....</div>}> <UserRightMaster /></Suspense> },
        ],
      },
      {
        path: '/Zone', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <Suspense fallback={<div>loding....</div>}> <ZoneMaster /></Suspense> },
        ],
      },
      {
        path: '/Slot', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <Suspense fallback={<div>loding....</div>}> <SlotMaster /></Suspense> },
        ],
      },
      {
        path: '/Driver', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <Suspense fallback={<div>loding....</div>}> <DriverMaster /></Suspense> },
          { path: 'mobile', element: <Suspense fallback={<div>loding....</div>}> <MobileAttendance /></Suspense> },
        ],
      },
      {
        path: '/Reports', element: <RootLayouts />,
        children: [
          { path: 'mainpage', element: <Suspense fallback={<CircularProgressThickness/>}> <ReportsMain /></Suspense> },
          { path: 'vehicle', element: <Suspense fallback={<CircularProgressThickness/>}> <ReportVehicleRegistration /></Suspense> },
          { path: 'Attendance', element: <Suspense fallback={<CircularProgressThickness/>}> <AttendanceReports /></Suspense> },
          { path: 'Revenue', element: <Suspense fallback={<CircularProgressThickness/>}> <DriverRevenueReports /></Suspense> },
        ],
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/Home/Dashboard" replace />
  }

],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const queryClient = new QueryClient()

function App() {
  return (
    <Suspense fallback={<Progress />} >
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={routes}
          future={{ v7_startTransition: true }}
        />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
