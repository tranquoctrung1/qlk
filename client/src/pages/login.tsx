import {
    BackgroundImage,
    Box,
    Button,
    Center,
    Col,
    Container,
    Grid,
    Group,
    Image,
    Text,
    TextInput,
} from '@mantine/core';

import { motion } from 'framer-motion';
import BackgroundWater from '../assets/background.png';

import { IconKey, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Logo from '../assets/logo.png';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { HostnameState } from '../features/hostname';

import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const hostname = useSelector(HostnameState);

    const [errorUserName, setErrorUserName] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    const { control, getValues, register } = useForm({
        defaultValues: {
            UserName: '',
            Password: '',
        },
    });

    const onSigninClicked = () => {
        const formValue = getValues();

        let isAllowSignIn = true;
        if (formValue.UserName === '') {
            setErrorUserName('Tài khoản không được trống!!');
            isAllowSignIn = false;
        } else {
            setErrorUserName('');
        }

        if (formValue.Password === '') {
            setErrorPassword('Mật khẩu không được trống!!');
            isAllowSignIn = false;
        } else {
            setErrorPassword('');
        }

        if (isAllowSignIn) {
            let url = `${hostname}/login`;
            axios
                .post(url, formValue)
                .then((res) => {
                    if (res.data.hasOwnProperty('error')) {
                        setErrorLogin(res.data.error);
                        localStorage.clear();
                    } else {
                        setErrorLogin('');
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('role', res.data.Role);
                        localStorage.setItem('token', res.data.token);

                        navigate('/');
                    }
                })
                .catch((err) => console.log(err.message));
        }
    };

    const onUserNameBlur = (e: any) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorUserName('');
        }
    };

    const onPasswordBlur = (e: any) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorPassword('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div style={{ height: '100vh' }}>
                <BackgroundImage
                    src={BackgroundWater}
                    style={{ height: '100%' }}
                >
                    <Container
                        fluid={true}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box style={{ width: '70%' }}>
                            <Grid
                                style={{
                                    padding: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 5px 0 rgba(0,0,0,.1)',
                                    backgroundColor: 'white',
                                }}
                            >
                                <Col
                                    span={12}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Grid>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    width: '250px',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                }}
                                            >
                                                <Image
                                                    radius="md"
                                                    src={Logo}
                                                    alt="Random unsplash image"
                                                />
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <Center>
                                                <Text
                                                    weight={500}
                                                    size="xl"
                                                    transform="uppercase"
                                                >
                                                    Đăng nhập
                                                </Text>
                                            </Center>
                                        </Col>
                                        <Col span={12}>
                                            <Controller
                                                name="UserName"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextInput
                                                        type="text"
                                                        placeholder="Tài khoản"
                                                        label="Tài khoản"
                                                        {...field}
                                                        error={errorUserName}
                                                        {...register(
                                                            'UserName',
                                                            {
                                                                onBlur: onUserNameBlur,
                                                            },
                                                        )}
                                                        icon={<IconUser />}
                                                    />
                                                )}
                                            ></Controller>
                                        </Col>
                                        <Col span={12}>
                                            <Controller
                                                name="Password"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextInput
                                                        type="Password"
                                                        placeholder="Mật khẩu"
                                                        label="Mật khẩu"
                                                        {...field}
                                                        error={errorPassword}
                                                        {...register(
                                                            'Password',
                                                            {
                                                                onBlur: onPasswordBlur,
                                                            },
                                                        )}
                                                        icon={<IconKey />}
                                                    />
                                                )}
                                            ></Controller>
                                        </Col>
                                        {errorLogin !== '' ? (
                                            <Col span={12}>
                                                <Text color="red" size="sm">
                                                    {errorLogin}
                                                </Text>
                                            </Col>
                                        ) : null}
                                        <Col span={12}>
                                            <Button
                                                color="blue"
                                                variant="filled"
                                                fullWidth
                                                onClick={onSigninClicked}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Text
                                                size="md"
                                                weight={500}
                                                color="blue"
                                            >
                                                Copyright 2022 By Xưởng Cúp
                                                Nghĩa Lê
                                            </Text>
                                            <Group spacing="xs">
                                                <Text weight={500} size="xs">
                                                    Điện thoại:{' '}
                                                </Text>
                                                <Text size="xs">
                                                    090.923.1091
                                                </Text>
                                            </Group>
                                        </Col>
                                    </Grid>
                                </Col>
                            </Grid>
                        </Box>
                    </Container>
                </BackgroundImage>
            </div>
        </motion.div>
    );
};

export default Login;
