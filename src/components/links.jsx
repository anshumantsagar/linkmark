import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';


class Links extends Component {
    state = {
        modals : [false],
        modalData : {
            title : '',
            id : '',
            password : ''
        },
        isDirty : {
            title : false,
            id : false,
            password : false
        },
        errors : {},
        list: []
    }

    componentDidMount() {
        axios.get('https://linkmark-ebe333.firebaseio.com/userCreds.json').then(data => {
            this._createList(data.data);
        })
        .catch(err => console.log(err));
    }

    _createList = (data) => {
        let fetchedCreds = [];
        for (let key in data) {
            fetchedCreds.push({
                ...data[key],
                id:key
            })
        }
        fetchedCreds = fetchedCreds.filter(each => {
            return each.userid === 'newuser' 
        })
        console.log(fetchedCreds)
        this.setState({list:fetchedCreds},() => console.log(this.state.list));
    }

    _handleOnChangeModalData = (field,event) => {
        const { modalData, isDirty } = this.state;
        modalData[field] = event.target.value;
        isDirty[field] = true;
        this.setState({modalData, isDirty}, () => this._validateData());
    }

    _validateData = () => {
        const { modalData, isDirty, errors } = this.state;
        Object.keys(modalData).forEach((each) => {
            if (each === 'title' && isDirty.title) {
                if(!modalData.title.trim().length) {
                    errors.title = "*Required ";
                } else {
                    delete errors[each];
                    isDirty.title = false;
                }
            } else if (each === 'id' && isDirty.id) {
                if(!modalData.id.trim().length) {
                    errors[each] = "*Required";
                } else {
                    delete errors[each];
                    isDirty.id = false;
                }
            } else if (each === "password" && isDirty.password) {
              if (!modalData.password.trim().length) {
                errors[each] = "*Required";
              } else {
                delete errors[each];
                isDirty.password = false;
              }
            } 
          });
          this.setState({ errors, isDirty }
            // ,() => console.log(this.state.errors)
            );
          return Object.keys(errors).length ? errors : null;
    }

    _createNewLink = () => {
        const { title, id, password } = this.state.modalData;
        const cred = {
            title : title,
            id : id,
            password: password,
            userid : 'lol',
            credId : Date.now()
        }
        axios.post('https://linkmark-ebe333.firebaseio.com/userCreds.json',cred)
            .then(response => {
                console.log(response);
                if (response.data) {
                    this._toggleModal(0);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    _toggleModal = (index) => {
        const  { modals } = this.state
        modals[index] = !modals[index]
        this.setState({modals});
    }

    _onCancelAddData = () => {
        this.setState({
            modalData : {
                title : '',
                id : '',
                password : ''
            }
        })
        this._toggleModal(0);
    }

    render() {
        let accountsList = null;
        if(this.state.list) {
            console.log(this.state.list)
            accountsList = this.state.list.map(each => {
                return (
                    <div className='singleCred' key={each.id}>
                        <h3>{each.title}</h3>
                        <p>User Id : <strong>{each.userid}</strong></p>
                        <p>Password : <strong>{each.password}</strong></p>
                        <div className="credButtons">
                            <Button color='warning'>Edit</Button>
                            <Button color='danger'>Delete</Button>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className='links'>
                <Button onClick={() => this._toggleModal(0)}>Add New Account</Button>
                <div>
                    {accountsList}
                </div>
                <Modal isOpen={this.state.modals[0]} toggle={this._onCancelAddData} className="modal-dialog-centered">
                    <ModalHeader toggle={this._onCancelAddData}>Add Link</ModalHeader>
                    <ModalBody className="modalContent">
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter Title" value={this.state.modalData.title} onChange={(event) => this._handleOnChangeModalData('title',event)} />
                        {this.state.isDirty.title ? <small className="errors">{this.state.errors.title}</small> : null}
                    </FormGroup>
                    <FormGroup>
                        <Label>Id/Email</Label>
                        <Input type="text" placeholder="Enter Uerid" value={this.state.modalData.id} onChange={(event) => this._handleOnChangeModalData('id',event)}/>
                        {this.state.isDirty.id ? <small className="errors">{this.state.errors.id}</small> : null}
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="text" placeholder="Enter password" value={this.state.modalData.password} onChange={(event) => this._handleOnChangeModalData('password',event)}/>
                        {this.state.isDirty.password ? <small className="errors">{this.state.errors.password}</small> : null}
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button className="modalBtnCancel" onClick={this._onCancelAddData}>
                        Cancel
                    </Button>
                    <Button className="modalBtnSave" onClick={this._createNewLink}>
                        {this.state.activeEditFlag ? 'Update' : 'Create'}
                    </Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

export default Links;