import ProductModalInterface from '../types/product.type';

import {
    Button,
    Center,
    Col,
    Grid,
    NumberInput,
    Select,
    Space,
    Text,
    TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Controller, useForm } from 'react-hook-form';

import { CurrentCabinetState } from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { HostnameState } from '../features/hostname';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';

import {
    ProductState,
    addProduct,
    addProducts,
    deleteProduct,
    updateProduct,
} from '../features/products';

const Product = ({ id, name }: ProductModalInterface) => {
    const [products, setProducts] = useState([]);

    const [errorProductId, setErrorProductId] = useState('');
    const [errorProductName, setErrorProductName] = useState('');
    const [errorImportDate, setErrorImportDate] = useState('');

    const hostname = useSelector(HostnameState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const currentStock = useSelector(CurrentStockState);
    const listProduct = useSelector(ProductState);

    const dispatch = useDispatch();

    const getProducts = () => {
        let url = `${hostname}/GetProducts`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        dispatch(addProducts(res.data));

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
            _id: '',
            ProductID: '',
            Name: '',
            ImportDate: new Date(Date.now()),
            Unit: '',
            BaseAlarm: 0,
            Price: 0,
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
            setValue('_id', find._id);
            //@ts-ignore
            setValue('Price', find.Price);
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
            //@ts-ignore
            setValue('_id', '');
            // @ts-ignore
            setValue('Price', 0);
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

            let obj = {
                ProductID: formValue.ProductID,
                Name: formValue.Name,
                ImportDate: formValue.ImportDate.getTime(),
                Unit: formValue.Unit,
                BaseAlarm: formValue.BaseAlarm,
                Price: formValue.Price,
            };

            axios
                .post(url, obj)
                .then((res) => {
                    if (res.status == 200 && res.data != '') {
                        setValue('_id', res.data);

                        dispatch(addProduct(formValue));

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

    const onUpdateProductClick = () => {
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
            let url = `${hostname}/UpdateProduct`;

            //@ts-ignore
            formValue.ImportDate = formValue.ImportDate.getTime();

            axios
                .patch(url, formValue)
                .then((res) => {
                    if (res.status == 200 && res.data > 0) {
                        dispatch(updateProduct(formValue));

                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhật sản phẩm thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cập nhật sản phẩm không thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onDeleteProductClick = () => {
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
                    let id = formValue._id;

                    let url = `${hostname}/DeleteProduct?id=${id}`;

                    axios
                        .delete(url)
                        .then((res) => {
                            if (res.status == 200 && res.data > 0) {
                                dispatch(deleteProduct(formValue._id));

                                let tmpProducts = products.filter(
                                    //@ts-ignore
                                    (el) => el.value !== formValue.ProductID,
                                );

                                setProducts([...tmpProducts]);

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Xóa sản phẩm thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Xóa sản phẩm không thành công',
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
        <>
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text weight={500} tt="capitalize">
                            Thêm sản phẩm
                        </Text>
                    </Center>
                </Col>
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
                        name="Price"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                defaultValue={getValues().Price}
                                placeholder="Đơn giá"
                                label="Đơn giá"
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
                        <Button color="blue" onClick={onUpdateProductClick}>
                            Sửa
                        </Button>
                        <Space w="md" />
                        <Button color="red" onClick={onDeleteProductClick}>
                            Xóa
                        </Button>
                    </Center>
                </Col>
            </Grid>
        </>
    );
};

export default Product;
