import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import withStyles from '@material-ui/core/styles/withStyles';
import Navbar from '../Components/Navbars/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import dashboardStyle from '../assets/jss/material-dashboard-react/layouts/dashboardStyle';
import EmployeeGrid from '../pages/employeeGrid';
import Employees from '../pages/addEditEmployee';
import image from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';
import { withTranslation } from 'react-i18next';
import { Props } from '../types/propTypes/index';
import { State } from '../types/stateTypes/index'

class Dashboard extends React.Component<Props, State> {
  refs: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      image: image,
      color: 'blue',
      hasImage: true,
      fixedClasses: 'dropdown show',
      mobileOpen: false
    };
  }

  handleImageClick = (i: string) => {
    this.setState({ image: i });
  }

  handleColorClick = (c: string) => {
    this.setState({ color: c });
  }

  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  getRoute() {
    return this.props.location.pathname !== '/admin/maps';
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener('resize', this.resizeFunction);
  }

  componentDidUpdate(e: any) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  render() {
    const { t } = this.props;
    const dashboardRoutes = [
      {
        path: '/employeeList',
        name: t("employeeList"),
        display: true,
        icon: DashboardIcon,
        component: EmployeeGrid,
        layout: '/admin'
      },
      {
        path: '/addEmployee',
        name: t("addEmployee"),
        icon: DashboardIcon,
        component: Employees,
        layout: '/admin',
        display: true,
      },
      {
        path: '/editemployees/:key',
        name: '',
        icon: "",
        component: Employees,
        layout: '/admin',
        display: false,
      }
    ];
    const switchRoutes = (
      <Switch>
        {dashboardRoutes.map((prop, key) => {
          if (prop.layout === '/admin') {
            return (
              <Route
                path={prop.path}
                component={prop.component}
                key={key}
                exact
              />
            );
          }
        })}
      </Switch>
    );

    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={''}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />

        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}

        </div>
      </div>
    );
  }
}

export default withTranslation()(withStyles(dashboardStyle)(Dashboard));
