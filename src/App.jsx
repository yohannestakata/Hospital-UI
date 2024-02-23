import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import DoctorDash from "./dashboards/DoctorDash";
import ReceptionDash from "./dashboards/ReceptionDash";
import AddUserPage from "./pages/AddUserPage";
import ErrorPage from "./pages/ErrorPage";
import WaitListPage from "./pages/WaitListPage";
import NurseDash from "./dashboards/NurseDash";
import PatientVitalsForm from "./pages/PatientVitalsForm";
import SearchUserPage from "./pages/SearchUserPage";
import Login from "./features/authentication/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { UserProvider } from "./context/UserContext";
import { PatientProvider } from "./context/PatientContext";
import DoctorLayout from "./pages/DoctorLayout";
import DoctorOrderLab from "./features/doctor/DoctorOrderLab";
import { Toaster } from "react-hot-toast";
import ApproveUser from "./pages/ApproveUser";
import PatientVitalsPage from "./pages/PatientVitalsPage";
import UltrasoundPage from "./pages/UltrasoundPage";
import UltrasoundWriteTest from "./features/ultrasound/UltrasoundWriteTest";
import XrayPage from "./pages/XrayPage";
import XrayWriteTest from "./features/xray/XrayWriteTest";
import PatientUltrasoundPage from "./pages/PatientUltrasoundPage";
import PatientXrayPage from "./pages/PatientXrayPage";
import LabResultsPage from "./pages/LabResultsPage";
import LabWriteTest from "./pages/LabWriteTest";
import PatientLabResultPage from "./pages/PatientLabResultPage";
import Admin from "./features/Admin/Admin";
import DoctorWriteDiagnosis from "./features/doctor/DoctorWriteDiagnosis";
import PatientHistory from "./pages/PatientHistory";
import DoctorViewHistoryDetail from "./features/doctor/DoctorViewHistoryDetail";
import Direct from "./features/reception/Direct";
import AddOldPatient from "./features/reception/AddOldPatient";
import DoctorScheduleAppointment from "./features/doctor/DoctorScheduleAppointment";
import ViewAppointments from "./features/reception/ViewAppointments";
import AdminLayout from "./pages/AdminLayout";
import ViewPatients from "./features/Admin/ViewPatients";
import DoctorDiagnosis from "./features/doctor/DoctorDiagnosis";
import UltrasoundLayout from "./features/ultrasound/UltrasoundLayout";
import UltrasoundWriteXTest from "./features/ultrasound/UltrasoundWriteXTest";
import AddUltraTemplate from "./features/ultrasound/AddUltraTemplate";
import AddXrayTemplate from "./features/ultrasound/AddXrayTemplate";
import AddBid from "./features/reception/AddBid";
import UpdatePatient from "./features/reception/UpdatePatient";
import AddTests from "./features/Admin/AddTests";

axios.defaults.headers.common["Authorization"] = Cookies.get("jwt_token");

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/doctor", element: <DoctorDash /> },
      {
        path: "/doctor/:patientId",
        element: <DoctorLayout />,
        children: [
          { path: "/doctor/:patientId/order-lab", element: <DoctorOrderLab /> },
          { path: "/doctor/:patientId/vitals", element: <PatientVitalsPage /> },
          {
            path: "/doctor/:patientId/ultra-results",
            element: <PatientUltrasoundPage />,
          },
          {
            path: "/doctor/:patientId/xray-results",
            element: <PatientXrayPage />,
          },
          {
            path: "/doctor/:patientId/lab-results",
            element: <PatientLabResultPage />,
          },
          {
            path: "/doctor/:patientId/diagnosis",
            element: <DoctorWriteDiagnosis />,
          },
          {
            path: "/doctor/:patientId/diagnosis2",
            element: <DoctorDiagnosis />,
          },
          {
            path: "/doctor/:patientId/history",
            element: <PatientHistory />,
          },
          {
            path: "/doctor/:patientId/history/:patientId",
            element: <DoctorViewHistoryDetail />,
          },
          {
            path: "/doctor/:patientId/appointment/",
            element: <DoctorScheduleAppointment />,
          },
          {
            path: "/doctor/:patientId/edit/:patientId",
            element: <UpdatePatient />,
          },
        ],
      },
      {
        path: "/reception",
        element: <ReceptionDash />,
        children: [
          { path: "/reception/waitlist", element: <WaitListPage /> },
          { path: "/reception/approve-order", element: <ApproveUser /> },
          { path: "/reception/add-user", element: <AddUserPage /> },
          { path: "/reception/search-patient", element: <SearchUserPage /> },
          { path: "/reception/direct", element: <Direct /> },
          { path: "/reception/appointments", element: <ViewAppointments /> },
          { path: "/reception/add-old-patient", element: <AddOldPatient /> },
          { path: "/reception/bid", element: <AddBid /> },
          {
            path: "/reception/editPatient/:patientId",
            element: <UpdatePatient />,
          },
        ],
      },
      { path: "/nurse/:patientId", element: <PatientVitalsForm /> },
      { path: "/nurse", element: <NurseDash /> },
      {
        path: "/ultrasound",
        element: <UltrasoundLayout />,
        children: [
          { path: "/ultrasound/waitinglist", element: <UltrasoundPage /> },
          { path: "/ultrasound/Ultrasound", element: <UltrasoundWriteTest /> },
          {
            path: "/ultrasound/X-ray",
            element: <UltrasoundWriteXTest />,
          },
          {
            path: "/ultrasound/add-ultra-templ",
            element: <AddUltraTemplate />,
          },
          {
            path: "/ultrasound/add-xray-templ",
            element: <AddXrayTemplate />,
          },
        ],
      },
      { path: "/xray", element: <XrayPage /> },
      { path: "/xray/write-test", element: <XrayWriteTest /> },
      { path: "/lab-results", element: <LabResultsPage /> },
      { path: "/lab/lab-results/write-test", element: <LabWriteTest /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "/admin/income", element: <Admin /> },
          { path: "/admin/patients", element: <ViewPatients /> },
          {
            path: "/admin/history",
            element: <PatientHistory />,
          },
          {
            path: "/admin/:patientId/history/:patientId",
            element: <DoctorViewHistoryDetail />,
          },
          {
            path: "/admin/add-tests",
            element: <AddTests />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchInterval: 1 * 1000 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PatientProvider>
          <Toaster
            toastOptions={{
              className: "",
              duration: 3000,
              style: {
                background: "#111827",
                color: "#f9fafb",
              },

              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <RouterProvider router={router} />
        </PatientProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
