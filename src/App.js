
import './App.less';

// import Routes from './router';
import { BrowserRouter as Router, Route, Switch/** , Redirect */ } from 'react-router-dom';
// import AdminLayout from '@/layouts/AdminLayout';
import NotFound from '@/pages/NotFound';
// import LoginLayout from '@/layouts/LoginLayout'

import { createRoutes } from '@/router';


const arr = createRoutes();
console.log('arr: ', arr);

function App() {
  return (
    <div className="App">
      <h2>{process.env.NODE_ENV}-{process.env.REACT_APP_VERSION}</h2>

      <Router>
        <Switch>
            {/* <Routes /> */}
            {/* <Route exact path="/" render={() => <AdminLayout />} /> */}
            {/* <Route path="/admin" component={AdminLayout} /> */}
            {/* <Route path="/404" component={NotFound} /> */}
            {/* <Route path="/login" component={LoginLayout} /> */}
            {
                arr.map((item) => item)
              }
            <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
