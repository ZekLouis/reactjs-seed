import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import Modal from 'antd/lib/modal';

export default class Home extends Component {

    showMessage() {
        Message.success('Hey !')
    }

    openModal() {
        Modal.confirm({
            cancelText: 'Cancel',
            content: 'Are you sure ?',
            title: 'Confirmation',
            okText: 'Ok',
            onOk: () => {
                console.log('ok')
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <Button type="primary" onClick={this.showMessage.bind(this)}>Display Message</Button>
                <Button type="primary" onClick={this.openModal.bind(this)}>Open Modal</Button>
            </div>
        );
    }
}