import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Roles from "./pages/Roles";
import Blogs from "./pages/Blogs";
import LoginPage from "./pages/LoginPage";
import SidebarLayout from "./components/SidebarLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/users"
            element={
              <SidebarLayout
                title="Users"
                component={<Users />}
                handleShowAll={() => {
                  console.log("users");
                }}
                handleAddNew={() => {}}
              />
            }
          />
          <Route
            path="/companies"
            element={
              <SidebarLayout
                title="Companies"
                component={<Companies />}
                handleShowAll={() => {
                  console.log("companies");
                }}
                handleAddNew={() => {}}
              />
            }
          />
          <Route
            path="/roles"
            element={
              <SidebarLayout
                title="Roles"
                component={<Roles />}
                handleShowAll={() => {
                  console.log("roles");
                }}
                handleAddNew={() => {}}
              />
            }
          />
          {/* <Route path="/companies" element={<Companies />} />
          <Route path="/roles" element={<Roles />} /> */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/profile" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
