
// in src/App.tsx
import { Admin, Resource, CustomRoutes } from "react-admin";
import { customDataProvider } from "./dataProvider";
import fakeDataProvider from "ra-data-fakerest";
import { Dashboard } from "./dashboard";
import { authProvider, apInitialize } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import LoginPage, { Login } from "./Login";
import data from "./data";
import { MicrosoftExcelList, MicrosoftExcelCreate, MicrosoftExcelEdit} from "./resources/MicrosoftExcel";
import { MicrosoftPowerBIList, MicrosoftPowerBICreate, MicrosoftPowerBIEdit} from "./resources/MicrosoftPowerBI";
import { DataAnalyticsList, DataAnalyticsCreate, DataAnalyticsEdit} from "./resources/DataAnalytics";
import { ProjectManagementList, ProjectManagementCreate, ProjectManagementEdit} from "./resources/ProjectManagement";
import { DataScienceList, DataScienceCreate, DataScienceEdit} from "./resources/DataScience";
import MicrosoftExcelIcon from "@mui/icons-material/Microwave";
import MicrosoftPowerBIIcon from "@mui/icons-material/Microwave";
import DataAnalyticsIcon from "@mui/icons-material/Analytics";
import ProjectManagementIcon from "@mui/icons-material/ManageAccounts";
import DataScienceIcon from "@mui/icons-material/Science"; 
// SUPERTOKENS
import React from "react";
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
let sessionFn = Session.init();
SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_SUPERTOKENS_APPNAME,
    apiDomain: import.meta.env.VITE_BACKEND_DOMAIN,
    websiteDomain: import.meta.env.VITE_SUPERTOKENS_WEBSITEDOMAIN,
    apiBasePath: import.meta.env.VITE_BACKEND_APIPATH + "/auth",
    websiteBasePath: import.meta.env.VITE_SUPERTOKENS_WEBSITEBASEPATH,
  },
  recipeList: [
    ThirdPartyPasswordless.init({
      contactMethod: "EMAIL",
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Github.init(),
          //ThirdPartyPasswordless.Google.init(),
          //ThirdPartyPasswordless.Facebook.init(),
          //ThirdPartyPasswordless.Apple.init(),
        ],
      },
    }),
    sessionFn,
  ],
});
apInitialize(Session);
// END SUPERTOKENS
let dataProvider: any;
if (import.meta.env.VITE_USE_BACKEND_DATA === "true") {
  dataProvider = customDataProvider(
    import.meta.env.VITE_BACKEND_DOMAIN +
      import.meta.env.VITE_BACKEND_APIPATH +
      "/proxy"
  );
} else {
  dataProvider = fakeDataProvider(data.defaultData);
}

const App = () => (
  <SuperTokensWrapper>
    <BrowserRouter basename="/a72ad3fed">
      <Admin
        authProvider={
          import.meta.env.VITE_ENVIRONMENT != "DEV" ? authProvider : undefined
        }
        requireAuth
        loginPage={LoginPage}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
        
      >
    <Resource name="MicrosoftExcel" options={{label:"Microsoft Excel"}} 
list={MicrosoftExcelList}
create={MicrosoftExcelCreate}
edit={MicrosoftExcelEdit}
recordRepresentation="title"
icon={MicrosoftExcelIcon}/>
<Resource name="MicrosoftPowerBI" options={{label:"Microsoft Power Bi"}} 
list={MicrosoftPowerBIList}
create={MicrosoftPowerBICreate}
edit={MicrosoftPowerBIEdit}
recordRepresentation="title"
icon={MicrosoftPowerBIIcon}/>
<Resource name="DataAnalytics" options={{label:"Data Analytics"}} 
list={DataAnalyticsList}
create={DataAnalyticsCreate}
edit={DataAnalyticsEdit}
recordRepresentation="title"
icon={DataAnalyticsIcon}/>
<Resource name="ProjectManagement" options={{label:"Project Management"}} 
list={ProjectManagementList}
create={ProjectManagementCreate}
edit={ProjectManagementEdit}
recordRepresentation="title"
icon={ProjectManagementIcon}/>
<Resource name="DataScience" options={{label:"Data Science"}} 
list={DataScienceList}
create={DataScienceCreate}
edit={DataScienceEdit}
recordRepresentation="title"
icon={DataScienceIcon}/>
    <CustomRoutes noLayout>
      {/*This renders the login UI on the /auth route*/}
      {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
      {/*Your app routes*/}
    </CustomRoutes>
  </Admin>
  </BrowserRouter>
  </SuperTokensWrapper>
);

export default App;
