import ProductModalInterface from '../types/product.type';

import {
    Button,
    Center,
    Col,
    Grid,
    NumberInput,
    Select,
    Space,
    TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Controller, useForm } from 'react-hook-form';

import { CurrentCabinetState } from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { HostnameState } from '../features/hostname';

import { useSelector } from 'react-redux';

import axios from 'axios';

import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';

const Product = ({ id, name }: ProductModalInterface) => {
    const [products, setProducts] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [errorProductId, setErrorProductId] = useState('');
    const [errorProductName, setErrorProductName] = useState('');
    const [errorImportDate, setErrorImportDate] = useState('');

    const hostname = useSelector(HostnameState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const currentStock = useSelector(CurrentStockState);

    const getProducts = () => {
        let url = `${hostname}/GetProducts`;

        axios
            .get(url)
            .then((res) => {
                if (res.data.length > 0) {
                    //@ts-ignore
                    setListProduct([...res.data]);

                    let temp = [];

                    for (let item of res.data) {
                        let obj = {
                            value: item.ProductID,
                            label: item.ProductID,
                        };

                        temp.push(obj);
                    }
                    //@ts-ignore
                    setProducts([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            ProductID: '',
            Name: '',
            ImportDate: new Date(Date.now()),
            Unit: '',
            BaseAlarm: 0,
            Amount: 0,
        },
    });

    const onProductIDChange = (e: any) => {
        //@ts-ignore
        let find = listProduct.find((el) => el.ProductID === e.target.value);

        if (find !== undefined) {
            // @ts-ignore
            setValue('Name', find.Name);
            // @ts-ignore
            setValue('Unit', find.Unit);
            if (
                // @ts-ignore
                find.ImportDate !== undefined &&
                //@ts-ignore
                find.ImportDate !== null &&
                //@ts-ignore
                find.ImportDate !== ''
            ) {
                // @ts-ignore
                setValue('ImportDate', new Date(find.ImportDate));
            } else {
                // @ts-ignore
                setValue('ImportDate', new Date());
            }

            // @ts-ignore
            setValue('BaseAlarm', find.BaseAlarm);
            //@ts-ignore
            setValue('Amount', find.Amount);
        }
    };

    const onProductIDBlur = (e: any) => {
        //@ts-ignore
        let find = listProduct.find((el) => el.ProductID === e.target.value);

        if (find === undefined) {
            // @ts-ignore
            setValue('Name', '');
            // @ts-ignore
            setValue('Unit', '');
            // @ts-ignore
            setValue('ImportDate', new Date());
            // @ts-ignore
            setValue('BaseAlarm', 0);
            // @ts-ignore
            setValue('Amount', 0);
        }
    };

    const onAddProductClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.ProductID === undefined ||
            formValue.ProductID === null ||
            formValue.ProductID === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!');
            isAllow = false;
        } else {
            setErrorProductId('');
        }

        if (
            formValue.Name === undefined ||
            formValue.Name === null ||
            formValue.Name === ''
        ) {
            setErrorProductName('Tên sản phẩm không được trống!!!');
            isAllow = false;
        } else {
            setErrorProductName('');
        }

        if (
            formValue.ImportDate === null ||
            formValue.ImportDate === undefined ||
            formValue.ImportDate.toString() === ''
        ) {
            setErrorImportDate('Ngày nhập không được trống!!!');
            isAllow = false;
        } else {
            setErrorImportDate('');
        }

        if (isAllow) {
            let url = `${hostname}/InsertProduct`;

            axios
                .post(url, formValue)
                .then((res) => {
                    if (res.data != '') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm sản phẩm thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thêm sản phẩm không thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <Grid>
                <Col md={6}>
                    <Controller
                        name="ProductID"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã sản phẩm"
                                data={products}
                                placeholder="Chọn mã sản phẩm"
                                nothingFound="Không tìm thấy"
                                searchable
                                creatable
                                withAsterisk
                                getCreateLabel={(query) =>
                                    `+ Tạo mã sản phẩm: ${query}`
                                }
                                onCreate={(query) => {
                                    const item = { value: query, label: query };
                                    // @ts-ignore
                                    setProducts((current) => [
                                        ...current,
                                        item,
                                    ]);
                                    return item;
                                }}
                                {...register('ProductID', {
                                    onChange: onProductIDChange,
                                    onBlur: onProductIDBlur,
                                })}
                                {...field}
                                error={errorProductId}
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
                                placeholder="Tên sản phẩm"
                                label="Tên sản phẩm"
                                withAsterisk
                                {...field}
                                error={errorProductName}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="ImportDate"
                        control={control}
                        render={({ field }) => (
                            <DateTimePicker
                                clearable
                                defaultValue={getValues().ImportDate}
                                placeholder="Ngày nhập"
                                label="Ngày nhập"
                                withAsterisk
                                {...field}
                                mx="auto"
                                error={errorImportDate}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="Unit"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Đơn vị"
                                label="Đơn vị"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="Unit"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Đơn vị"
                                label="Đơn vị"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="BaseAlarm"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                defaultValue={getValues().BaseAlarm}
                                placeholder="Ngưỡng cảnh báo"
                                label="Ngưỡng cảnh báo"
                                variant="filled"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="Amount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                defaultValue={getValues().Amount}
                                placeholder="Số lượng trên kệ"
                                label="Số lượng trên kệ"
                                variant="filled"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col span={12}>
                    <Center>
                        <Button color="green" onClick={onAddProductClicked}>
                            Thêm
                        </Button>
                        <Space w="md" />
                        <Button color="violet">Sửa sản phẩm trong tầng</Button>
                        <Space w="md" />
                        <Button color="blue">Sửa sản phẩm</Button>
                        <Space w="md" />
                        <Button color="pink">Xóa sản phẩm trong tầng</Button>
                        <Space w="md" />
                        <Button color="red">Xóa sản phẩm</Button>
                    </Center>
                </Col>
            </Grid>
        </>
    );
};

export default Product;
