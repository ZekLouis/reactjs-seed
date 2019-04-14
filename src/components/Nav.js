import React, { Component } from 'react';
import { Menu, Icon, Modal } from "antd";
import { Link, Redirect } from "react-router-dom";

export default class Nav extends Component {

    constructor(props) {
        super(props);
        let path = window.location.pathname;
        // enable the right element in the nav
        this.state = {
            key: path
        };
        this.app = this.props.app;
    }

    isExistingRoute(path) {
        let routes = this.app.router.getRoutes();
        for (let route of routes) {
            if (route.path === path) {
                return true;
            }
        }

        return false;
    }

    render() {
        let key = this.state.key;

        // if not allowed route go to home
        let path = window.location.pathname;
        let redirect = '';
        if (!this.isExistingRoute(path)) {
            let defaultRoute = this.app.router.getDefaultRoute();
            key = defaultRoute.path;
            redirect = <Redirect to={key}/>;
        }

        let items = this.getItems();

        return (
            <div>
                <div className="logo" />
                {redirect}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[key]}>
                    {items}


                    <Menu.Item onClick={this.logout.bind(this)}>
                        <Icon type="export" />
                        <span>Logout</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }

    logout() {
        Modal.confirm({
            cancelText: 'Cancel',
            content: 'Are you sure ?',
            title: 'Confirmation',
            okText: 'Ok',
            onOk: () => {
                this.app.auth.logout();
                this.app.forceUpdate();
            }
        })
    }

    getItems() {
        let items = [];
        let routes = this.app.router.getRoutes();

        for (let route of routes) {
            items.push(
                <Menu.Item key={route.path}>
                    <Link to={route.path}>
                        <Icon type={route.icon} />
                        <span>{route.text}</span>
                    </Link>
                </Menu.Item>
            );
        }

        return items;
    }
}