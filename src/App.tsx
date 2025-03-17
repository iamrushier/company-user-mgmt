import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UsersDataProvider } from "../store/context/UsersDataContext";
import { CompaniesDataProvider } from "../store/context/CompaniesDataContext";
import { RolesDataProvider } from "../store/context/RolesDataContext";
import { BlogsDataProvider } from "../store/context/BlogsDataContext";
import { CommentsDataProvider } from "../store/context/CommentsDataContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <CompaniesDataProvider>
        <RolesDataProvider>
          <BlogsDataProvider>
            <CommentsDataProvider>
              <UsersDataProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </UsersDataProvider>
            </CommentsDataProvider>
          </BlogsDataProvider>
        </RolesDataProvider>
      </CompaniesDataProvider>
    </>
  );
}

export default App;
