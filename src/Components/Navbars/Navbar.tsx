import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks';
import Button from '../CustomButtons/Button';
import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { login } from "../../redux/action/login.action";
import { withRouter } from "react-router";


function Header({ ...props }: any) {
  const { t, i18n } = useTranslation();
  function makeBrand() {
    var name;
    props.routes.map((prop: any, key: any) => {
      if (prop.layout + prop.path === props.location.pathname) {
        name =  prop.name;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          {/* <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button> */}
          <Button color="white" className="float-right"
            onClick={() => {
              localStorage.setItem('isLogin','false');
              props.login(false);
              props.history.push("/");
            }}
          >
            {t('logOut')}
          </Button>
        </div>
        <Hidden smDown={true} implementation="css">
          { <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp={true} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
// };

const mapDispatchToprops = (dispatch:any) => ({
  login: (isLogin:any) => dispatch(login(isLogin))
});
export default connect(
  null,
  mapDispatchToprops
)((withStyles(headerStyle)(withRouter(Header))));


//export default withStyles(headerStyle)(Header);
