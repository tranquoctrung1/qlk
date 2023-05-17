import {
    Button,
    Center,
    Col,
    Grid,
    PasswordInput,
    Select,
    Space,
    TextInput,
} from '@mantine/core';

import axios from 'axios';

import { HostnameState } from '../features/hostname';

import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

const User = () => {
    const hostname = useSelector(HostnameState);

    const [users, setUsers] = useState([]);
    const [userForSelect, setUserForSelect] = useState([]);
    const [errorUserName, setErrorUserName] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRole, setErrorRole] = useState('');

    const { control, getValues, setValue, register, reset } = useForm({
        defaultValues: {
            UserName: '',
            Password: '',
            Role: '',
            Name: '',
        },
    });

    const getUsers = () => {
        let url = `${hostname}/GetUsers`;

        axios.get(url).then((res) => {
            if (res.status === 200 && res.data.length > 0) {
                //@ts-ignore
                setUsers([...res.data]);

                let temp = [];

                for (let user of res.data) {
                    let obj = {
                        value: user.UserName,
                        label: user.UserName,
                    };

                    temp.push(obj);
                }

                //@ts-ignore
                setUserForSelect([...temp]);
            }
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const onUserNameChanged = (e: any) => {
        //@ts-ignore
        let find = users.find((el) => el.UserName === e.target.value);

        if (find !== undefined) {
            //@ts-ignore
            setValue('Name', find.Name);
            //@ts-ignore
            setValue('Role', find.Role);
        }
    };

    const onUserNameBlured = (e: any) => {
        //@ts-ignore
        let find = users.find((el) => el.UserName === e.target.value);

        if (find === undefined) {
            //@ts-ignore
            setValue('Password', '');
            //@ts-ignore
            setValue('Name', '');
            //@ts-ignore
            setValue('Role', '');
        }
    };

    const onAddUserClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.UserName === '' ||
            formValue.UserName === null ||
            formValue.UserName === undefined
        ) {
            setErrorUserName('Tên đăng nhập không được trống!!');
            isAllow = false;
        } else {
            setErrorUserName('');
        }

        if (
            formValue.Password === '' ||
            formValue.Password === null ||
            formValue.Password === undefined
        ) {
            setErrorPassword('Mật khẩu không được trống!!');
            isAllow = false;
        } else {
            setErrorPassword('');
        }
        if (
            formValue.Role === '' ||
            formValue.Role === null ||
            formValue.Role === undefined
        ) {
            setErrorRole('Quyền không được trống!!');
            isAllow = false;
        } else {
            setErrorRole('');
        }

        if (isAllow) {
            let url = `${hostname}/InsertUser`;

            axios
                .post(url, formValue)
                .then((res) => {
                    if (res.status === 200 && res.data !== '') {
                        //@ts-ignore
                        setUsers((current) => [...current, formValue]);

                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm tài khoản thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thêm tài khoản không thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const onUpdateUserClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.UserName === '' ||
            formValue.UserName === null ||
            formValue.UserName === undefined
        ) {
            setErrorUserName('Tên đăng nhập không được trống!!');
            isAllow = false;
        } else {
            setErrorUserName('');
        }

        if (
            formValue.Password === '' ||
            formValue.Password === null ||
            formValue.Password === undefined
        ) {
            setErrorPassword('Mật khẩu không được trống!!');
            isAllow = false;
        } else {
            setErrorPassword('');
        }
        if (
            formValue.Role === '' ||
            formValue.Role === null ||
            formValue.Role === undefined
        ) {
            setErrorRole('Quyền không được trống!!');
            isAllow = false;
        } else {
            setErrorRole('');
        }

        if (isAllow) {
            let url = `${hostname}/UpdateUser`;

            axios
                .patch(url, formValue)
                .then((res) => {
                    if (res.status === 200 && res.data !== '') {
                        let temp = [...users];

                        //@ts-ignore
                        let find = temp.findIndex(
                            //@ts-ignore
                            (el) => el.UserName === formValue.UserName,
                        );

                        if (find >= 0) {
                            // @ts-ignore
                            temp[find] = formValue;

                            setUsers([...temp]);
                        }

                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhật tài khoản thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cập nhật tài khoản không thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const onDeleteUserClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.UserName === '' ||
            formValue.UserName === null ||
            formValue.UserName === undefined
        ) {
            setErrorUserName('Tên đăng nhập không được trống!!');
            isAllow = false;
        } else {
            setErrorUserName('');
        }

        if (isAllow) {
            Swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: 'Thinking before you click!!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0f0',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    let username = formValue.UserName;

                    let url = `${hostname}/DeleteUser?username=${username}`;

                    axios
                        .delete(url)
                        .then((res) => {
                            if (res.status == 200 && res.data > 0) {
                                let tmpUser = users.filter(
                                    //@ts-ignore
                                    (el) => el.UserName !== formValue.UserName,
                                );

                                setUsers([...tmpUser]);
                                //@ts-ignore
                                let temp = userForSelect.filter(
                                    //@ts-ignore
                                    (el) => el.value !== formValue.UserName,
                                );

                                setUserForSelect([...temp]);

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Xóa tài khoản thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Xóa tài khoản không thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            }
                        })
                        .catch((err) => console.log(err));
                    reset();
                }
            });
        }
    };

    return (
        <Grid>
            <Col md={6}>
                <Controller
                    name="UserName"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Tên đăng nhập"
                            data={userForSelect}
                            placeholder="Chọn tên đăng nhập"
                            nothingFound="Không tìm thấy"
                            searchable
                            creatable
                            withAsterisk
                            getCreateLabel={(query) =>
                                `+ Tạo tên đăng nhập: ${query}`
                            }
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                // @ts-ignore
                                setUserForSelect((current) => [
                                    ...current,
                                    item,
                                ]);
                                return item;
                            }}
                            {...register('UserName', {
                                onChange: onUserNameChanged,
                                onBlur: onUserNameBlured,
                            })}
                            {...field}
                            error={errorUserName}
                        />
                    )}
                ></Controller>
            </Col>
            <Col md={6}>
                <Controller
                    name="Password"
                    control={control}
                    render={({ field }) => (
                        <PasswordInput
                            placeholder="Mật khẩu"
                            label="Mật khẩu"
                            {...field}
                            withAsterisk
                            error={errorPassword}
                        />
                    )}
                ></Controller>
            </Col>
            <Col md={6}>
                <Controller
                    name="Name"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Tên người dùng"
                            label="Tên người dùng"
                            {...field}
                        />
                    )}
                ></Controller>
            </Col>
            <Col md={6}>
                <Controller
                    name="Role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Quyền"
                            placeholder="Chọn quyền"
                            data={[
                                { value: 'admin', label: 'Quản lý' },
                                { value: 'staff', label: 'Nhân viên' },
                            ]}
                            {...field}
                            withAsterisk
                            error={errorRole}
                        />
                    )}
                ></Controller>
            </Col>
            <Col span={12}>
                <Center>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onAddUserClicked}
                    >
                        Thêm
                    </Button>
                    <Space w="md" />
                    <Button
                        color="blue"
                        variant="filled"
                        onClick={onUpdateUserClicked}
                    >
                        Sửa
                    </Button>
                    <Space w="md" />
                    <Button
                        color="red"
                        variant="filled"
                        onClick={onDeleteUserClicked}
                    >
                        Xóa
                    </Button>
                </Center>
            </Col>
        </Grid>
    );
};

export default User;
