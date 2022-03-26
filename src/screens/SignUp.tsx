import React, { useState } from 'react';
import { Typography, Form, Input, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AuthImageHeader, PrimaryButton } from '../components';
import UploadComponent from '../components/UploadComponent';
import { SIGN_UP } from '../graphql';
import { errorMessage, successMessage } from '../utils/Notifications';
import { ADMIN, setToken } from '../services';
import { IAuth } from '../interfaces';
import { Authentication } from '../interfaces/Authentication';

const { Text } = Typography;
const { Password } = Input;
const FormItem = Form.Item;

type FormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
};

function SignUp({ setIsAuthenticated, setIsAdmin }: Authentication): React.ReactElement {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string>('');
    const [signUpMutation, { loading }] = useMutation(SIGN_UP);

    const handleSignUp = (values: FormValues) => {
        const { firstName, lastName, phone, email, password } = values;
        signUpMutation({
            variables: {
                user: {
                    firstName,
                    lastName,
                    phone,
                    email,
                    password,
                    photo,
                },
            },
        })
            .then((res) => {
                successMessage('User signed up successfully');
                const token = res?.data?.signup;
                setToken({ ...token, onBoarding: true } as IAuth);
                setIsAuthenticated(true);
                setIsAdmin((token as { user: { roleId: string } })?.user.roleId === ADMIN);
                navigate('account-onboarding');
            })
            .catch((err) => {
                errorMessage('User sign up failed');
                console.log(err);
            });
    };

    const formFields: React.ReactElement = (
        <>
            <UploadComponent text="Photo" getUrl={setPhoto} />
            <Row>
                <Col span={12} className="padding-right-sm">
                    <FormItem name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
                        <Input placeholder="First Name" />
                    </FormItem>
                </Col>
                <Col span={12} className="padding-left-sm">
                    <FormItem name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
                        <Input placeholder="Last Name" />
                    </FormItem>
                </Col>
            </Row>
            <FormItem name="phone" rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input placeholder="Phone Number" />
            </FormItem>
            <FormItem
                name="email"
                hasFeedback
                rules={[
                    { required: true, message: 'Email is required' },
                    { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
            >
                <Input placeholder="Email" type="email" />
            </FormItem>
            <FormItem name="password" hasFeedback rules={[{ required: true, message: 'Password is required' }]}>
                <Password placeholder="Password" />
            </FormItem>
            <FormItem
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm password',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Password placeholder="Confirm Password" />
            </FormItem>
        </>
    );

    return (
        <div className="webkit-center">
            <AuthImageHeader
                topText="Fusce Ultrices Ac Enim Nec Porttitor"
                pageTile="New Account"
                breadCrumb="Account Creation"
            />
            <div className="auth-form">
                <Form className="margin-y-xl" onFinish={handleSignUp}>
                    {formFields}
                    <Row className="space-between">
                        <Text style={{ color: '#000000CC', fontSize: '16px' }}>
                            Already have an account?{' '}
                            <Link to="/" className="auth-link">
                                Login!
                            </Link>
                        </Text>
                        <PrimaryButton title="Submit" htmlType="submit" loading={loading} />
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
