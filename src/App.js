import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './components/Nav';
import { Layout, Icon } from 'antd';
import Auth from "./library/Auth/Auth";
import ProjectRouter from "./config/Router";
import LoginForm from './library/Auth/LoginForm'

class App extends Component {

    state = {
        collapsed: false,
    };

    constructor(props) {
        super(props);
        this.auth = new Auth();
        this.router = new ProjectRouter(this.auth);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    renderRouter() {
        let content = [];
        let routes = this.router.getRoutes();

        let index = 0;
        for (let route of routes) {
            content.push(<Route key={index} path={route.path} exact component={route.component}/>);
            index ++;
        }

        return content;
    }

    renderLayout() {
        if (this.auth.isAuth()) {
            return (
                <Layout style={{
                    overflow: 'auto', height: '100vh',
                }} >
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <Nav app={this}/>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle.bind(this)}
                            />
                        </Layout.Header>
                        <Layout.Content style={{
                            margin: '24px'
                        }}
                        >
                            {this.renderRouter()}
                        </Layout.Content>
                    </Layout>
                </Layout>
            )
        } else {
            return (
                <Layout className="login-form-wrapper" style={{
                    overflow: 'auto', height: '100vh', flex: 1, justifyContent: 'center', alignItems: 'center'
                }} >
                    <LoginForm auth={this.auth} app={this}/>
                </Layout>
            );
        }
    }

    render() {

        return (
            <Router>
                <div className="App">
                   {this.renderLayout()}     
                </div>
            </Router>
        );
    }
}

export default App;
