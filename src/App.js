
import './App.less';

// import Routes from './router';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import AdminLayout from '@/layouts/AdminLayout';
import NotFound from '@/pages/NotFound';
// import LoginLayout from '@/layouts/LoginLayout'

import { createRoutes } from '@/router';

//  {/* <h2>{process.env.NODE_ENV}-{process.env.REACT_APP_VERSION}</h2> */}
const arr = createRoutes();
console.log('arr: ', arr);

function App() {
  return (
     

      <Router>
        <Switch>
            {/* <Routes /> /admin */}
            {/* <Route exact path="/" render={() => <AdminLayout />} /> */}
            {/* <Route path="/admin" component={AdminLayout} /> */}
            {/* <Route path="/404" component={NotFound} /> */}
            {/* <Route path="/login" component={LoginLayout} /> */}
            {
                arr.map((item) => item)
              }
              <Route exact path="/" render={(props) => 
              (<Redirect
                to={{
                  pathname: "/admin",
                }}
            />)
              } /> 
            <Route component={NotFound} />
        </Switch>
      </Router>
  );
}

export default App;
