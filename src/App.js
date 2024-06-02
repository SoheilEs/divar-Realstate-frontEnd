import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/templates/HomePage";
import DashboardPage from "./components/templates/DashboardPage";
import AdminPage from "./components/templates/AdminPage";
import CreateCategoryPage from "./components/templates/CreateCategory";
import { ThemeProvider, createTheme } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./services/user";
import Loader from "./components/modules/Loader";
import CategoryDetail from "./components/templates/CategoryDetail";
import AdsPage from "./components/templates/AdsPage";
import UserPage from "./components/templates/UserPage";
import CreateAds from "./components/templates/CreateAds";
import AdsDetailPage from "./components/templates/AdsDetailPage";

const theme = createTheme({
  typography:{
      fontFamily:"IRANYekan"
  }
})
function App() {
  const {data,isLoading} = useQuery({queryKey:["profile"],queryFn:getProfile})

  if(isLoading) return <Loader />
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={data?.data.role ==="USER" ? <CreateAds /> : <Navigate to="/" />} />
        <Route path="/profile" element={<DashboardPage />} />
        <Route path="/user/*" element={data?.data?.role === "USER" ? <UserPage /> : <Navigate to="/" /> }>
          <Route path="ads" element={<AdsPage />} />
          <Route path="ads/:id" element={<AdsDetailPage />} />
        </Route>
        <Route path="/admin/*" element={data?.data?.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />}>
          <Route path="category" element={ <CreateCategoryPage />} />
          <Route path="category/:id" element={ <CategoryDetail />} />
          <Route path="ads" element={<AdsPage />} />
        </Route>
      </Routes>
      </ThemeProvider>

  );
}

export default App;
