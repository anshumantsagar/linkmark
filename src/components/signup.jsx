import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import fire from '../helper-methods/fire';

class Signup extends Component {
    state = {
        signupDetails : {
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

    _onChnageHandler = (field, event) => {
        const { signupDetails, isDirty } = this.state;
        signupDetails[field] = event.target.value;
        isDirty[field] = true;
        this.setState({signupDetails, isDirty}, () => this._validateForm() );
    }

    _validateForm = () => {
        const { signupDetails, isDirty, errors } = this.state;
        Object.keys(signupDetails).forEach((each) => {
            if (each === 'email' && isDirty.email) {
                if(!signupDetails.email.trim().length) {
                    errors.email = "*Required ";
                } else if (signupDetails.email.trim().length < 3) {
                  errors.email = "username must be minimum 3 alphabets"
                } else {
                    delete errors[each];
                    isDirty.email = false;
                }
            } else if (each === "password" && isDirty.password) {
              if (!signupDetails.password.trim().length) {
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

    _onSubmit = (event) => {
        event.preventDefault();
        const { isDirty, signupDetails } = this.state;
        let isSignupAllowed = true;
        const isDirtyKeys = Object.keys(isDirty);
        isDirtyKeys.forEach(each => {
          isDirty[each] = true;
        });
        this.setState({isDirty});
        this._validateForm();
        isDirtyKeys.forEach(each => {
          if(isDirty[each] === true) {
            isSignupAllowed = false;
          }
        });    
        if (!isSignupAllowed) return;
        fire
            .auth()
            .createUserWithEmailAndPassword(signupDetails.email,signupDetails.password)
            .then(data => {
                console.log(data);
                ToastsStore.success('Successfull signup');
                ToastsStore.success('Redirecting to the Login Page');
                setTimeout(() => {
                    this.props.history.push('/');
                },3000)                
            })
            .catch(err => {
                switch(err.code) {
                    case 'auth/email-already-in-use':
                        ToastsStore.error(err.message);
                        break;
                    case 'auth/invalid-email':
                        ToastsStore.error(err.message);
                        break;
                    case 'auth/weak-password':
                        ToastsStore.error(err.message);
                        break;
                    default: 
                        ToastsStore.error('Something Went Wrong',err.message);
                }
            })
    }

    render () {
        const {signupDetails, errors, isDirty } = this.state;
        return (
            <div className='login'>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT}/>
                <Form>
                    <FormGroup onSubmit={this._onSubmit}>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="text" placeholder="enter your username" value={signupDetails.email} onChange={(event) => this._onChnageHandler('email',event)}/>
                        {isDirty.email ? <p style={{color:'red'}}>{errors.email}</p> : null}
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" placeholder="enter your password" value={signupDetails.password} onChange={(event) => this._onChnageHandler('password',event)}/>
                        {isDirty.password ? <p style={{color:'red'}}>{errors.password}</p> : null}
                    </FormGroup>
                    <Button type='submit' onClick={this._onSubmit}>Sign Up!</Button>
                </Form>
            </div>
        );
    }
}

export default Signup;