import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { connect } from 'react-redux';
import { login } from '../redux/actions/linkmark-action-creators';

class Login extends Component {
    state = {
        loginDetails : {
            email: '',
            password: ''
        },
        checkbox: false,
        isDirty : {
            email: false,
            password: false
        },
        errors : {}
    }

    componentDidMount() {
        if(this.props.token) {
            this.props.history.push('/links');
        }
    }

    _onChnageHandler = (field, event) => {
        const { loginDetails, isDirty } = this.state;
        loginDetails[field] = event.target.value;
        isDirty[field] = true;
        this.setState({loginDetails, isDirty}, () => this._validateForm() );
    }

    _validateForm = () => {
        const { loginDetails, isDirty, errors } = this.state;
        Object.keys(loginDetails).forEach((each) => {
            if (each === 'email' && isDirty.email) {
                if(!loginDetails.email.trim().length) {
                    errors.email = "*Required ";
                } else if (loginDetails.email.trim().length < 3) {
                  errors.email = "username must be minimum 3 alphabets"
                } else {
                    delete errors[each];
                    isDirty.email = false;
                }
            } else if (each === "password" && isDirty.password) {
              if (!loginDetails.password.trim().length) {
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

    _loginIn = (event) => {
        event.preventDefault();
        const { isDirty, loginDetails } = this.state;
        let isLoginAllowed = true;
        const isDirtyKeys = Object.keys(isDirty);
        isDirtyKeys.forEach(each => {
          isDirty[each] = true;
        });
        this.setState({isDirty});
        this._validateForm();
        isDirtyKeys.forEach(each => {
          if(isDirty[each] === true) {
            isLoginAllowed = false;
          }
        });    
        if (isLoginAllowed) {
            const authData = {
                email : loginDetails.email,
                password : loginDetails.password,
                returnSecureToken : true
            }
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnYaKsNVXQLJ4MQWSLH1EjdqxmPjXWO3U',authData)
                .then(response => {
                    console.log(response.data);
                    const userData = {
                        userId : response.data.localId,
                        token : response.data.idToken
                    }
                    ToastsStore.success('Logged In');
                    this.props.storeUserInfo(userData);
                    setTimeout(() => {
                        this.props.history.push('/links');
                    },3000)       
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    render () {
        const {loginDetails, errors, isDirty } = this.state;
        return (
            <div className='login'>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT}/>
                <Form>
                    <FormGroup onSubmit={this._loginIn}>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="text" placeholder="enter your username" value={loginDetails.email} onChange={(event) => this._onChnageHandler('email',event)}/>
                        {isDirty.email ? <p style={{color:'red'}}>{errors.email}</p> : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" placeholder="enter your password" value={loginDetails.password} onChange={(event) => this._onChnageHandler('password',event)}/>
                        {isDirty.password ? <p style={{color:'red'}}>{errors.password}</p> : null}
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" onChange={() => this.setState({checkbox:!this.state.checkbox})} />
                        Keep Me Logged In
                        </Label>
                    </FormGroup>
                    <Button type='submit' onClick={this._loginIn}>Log In!</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token : state.reducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUserInfo : (userDetails) => dispatch(login(userDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);