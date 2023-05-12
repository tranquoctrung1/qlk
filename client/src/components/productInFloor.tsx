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
import axios from 'axios';

import { DateTimePicker } from '@mantine/dates';

import { useEffect, useState } from 'react';

import { CurrentCabinetState } from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { HostnameState } from '../features/hostname';
import {
    ListProductState,
    addProductToListProduct,
    deleteProductToListProduct,
    updateProductToListProduct,
} from '../features/listProduct';
import { ProductState } from '../features/products';

import { useDispatch, useSelector } from 'react-redux';

import { Controller, useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

import ProductInFloorModalInterface from '../types/productInFloor.type';

const ProductInFloor = ({ name, id }: ProductInFloorModalInterface) => {
    const hostname = useSelector(HostnameState);
    const currentStock = useSelector(CurrentStockState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const products = useSelector(ProductState);
    const listProduct = useSelector(ListProductState);

    const [listProductForSlect, setListProductForSlect] = useState([]);
    const [errorProductId, setErrorProductId] = useState('');
    const [errorProductName, setErrorProductName] = useState('');
    const [errorImportDate, setErrorImportDate] = useState('');

    const dispatch = useDispatch();

    const getListProductByFloorId = (id: string | undefined) => {
        let url = `${hostname}/GetListProductByFloorId?id=${id}`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        // @ts-ignore
                        setListProduct([...res.data]);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (products.length > 0) {
            let temp = [];
            for (let product of products) {
                if (
                    //@ts-ignore
                    product.ProductID !== '' &&
                    //@ts-ignore
                    product.ProductID !== undefined &&
                    //@ts-ignore
                    product.ProductID !== null
                ) {
                    // @ts-ignore
                    temp.push(product.ProductID);
                }
            }

            //@ts-ignore
            setListProductForSlect([...temp]);
        }
    }, [products]);

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            _id: '',
            IdProduct: '',
            ProductId: '',
            ProductName: '',
            FloorId: id === undefined ? '' : id,
            FloorName: name === undefined ? '' : name,
            Amount: 0,
            ImportDate: new Date(),
            Unit: '',
        },
    });

    const onProductIDChange = (e: any) => {
        // @ts-ignore
        let tempListProduct = listProduct.find((el) => el.FloorId === id);

        //@ts-ignore
        let find = tempListProduct.ListProduct.find(
            //@ts-ignore
            (el) => el.ProductId === e.target.value,
        );

        if (find !== undefined) {
            setErrorProductId('');
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('IdProduct', find.IdProduct);
            //@ts-ignore
            setValue('ProductId', find.ProductId);
            //@ts-ignore
            setValue('ProductName', find.ProductName);
            //@ts-ignore
            setValue('Amount', find.Amount);
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
            //@ts-ignore
            setValue('Unit', find.Unit);
        } else {
            setErrorProductId('Mã sản phẩm này chưa có trong kệ');
            //@ts-ignore
            let temp = products.find((el) => el.ProductID === e.target.value);

            if (temp !== undefined) {
                //@ts-ignore
                setValue('IdProduct', temp._id);
                //@ts-ignore
                setValue('ProductId', temp.ProductID);
                //@ts-ignore
                setValue('ProductName', temp.Name);
                //@ts-ignore
                setValue('Amount', temp.Amount);
                if (
                    // @ts-ignore
                    temp.ImportDate !== undefined &&
                    //@ts-ignore
                    temp.ImportDate !== null &&
                    //@ts-ignore
                    temp.ImportDate !== ''
                ) {
                    // @ts-ignore
                    setValue('ImportDate', new Date(temp.ImportDate));
                } else {
                    // @ts-ignore
                    setValue('ImportDate', new Date());
                }
                //@ts-ignore
                setValue('Unit', temp.Unit);
            }
        }
    };

    const onAddProductInFloorClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.ProductId === undefined ||
            formValue.ProductId === null ||
            formValue.ProductId === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!');
            isAllow = false;
        } else {
            setErrorProductId('');
        }

        if (
            formValue.ProductName === undefined ||
            formValue.ProductName === null ||
            formValue.ProductName === ''
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
            let url = `${hostname}/InsertListProduct`;

            let obj = {
                IdProduct: formValue.IdProduct,
                ProductId: formValue.ProductId,
                ProductName: formValue.ProductName,
                FloorId: formValue.FloorId,
                FloorName: formValue.FloorName,
                Amount: formValue.Amount,
                ImportDate: formValue.ImportDate,
                Unit: formValue.Unit,
            };

            axios.post(url, obj).then((res) => {
                if (res.status === 200) {
                    if (res.data != '') {
                        setValue('_id', res.data);
                        setErrorProductId('');
                        // @ts-ignore
                        dispatch(addProductToListProduct(formValue));

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
                }
            });
        }
    };

    const onUpdateProductInFloorClick = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.ProductId === undefined ||
            formValue.ProductId === null ||
            formValue.ProductId === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!');
            isAllow = false;
        } else {
            setErrorProductId('');
        }

        if (
            formValue.ProductName === undefined ||
            formValue.ProductName === null ||
            formValue.ProductName === ''
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
            let url = `${hostname}/UpdateListProduct`;

            axios.patch(url, formValue).then((res) => {
                if (res.status === 200) {
                    if (res.data > 0) {
                        dispatch(updateProductToListProduct(formValue));

                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhật sản phẩm thành công',
                            showConfirmButton: true,
                            timer: 1000,
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cập nhật sản phẩm không thành công',
                        showConfirmButton: true,
                        timer: 1000,
                    });
                }
            });
        }
    };

    const onDeleteProductInFloorClick = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.ProductId === undefined ||
            formValue.ProductId === null ||
            formValue.ProductId === ''
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

                    let url = `${hostname}/DeleteListProduct?id=${id}`;

                    axios
                        .delete(url)
                        .then((res) => {
                            if (res.status == 200 && res.data > 0) {
                                dispatch(deleteProductToListProduct(formValue));

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
                            Thêm sản phẩm vào trong kệ
                        </Text>
                    </Center>
                </Col>
                <Col md={6}>
                    <TextInput
                        placeholder="Tên kho"
                        label="Tên kho"
                        defaultValue={currentStock.name}
                        disabled
                    ></TextInput>
                </Col>
                <Col md={6}>
                    <TextInput
                        placeholder="Tên kệ"
                        label="Tên kệ"
                        defaultValue={currentCabinet.name}
                        disabled
                    ></TextInput>
                </Col>
                <Col md={6}>
                    <TextInput
                        placeholder="Tên tầng"
                        label="Tên tầng"
                        defaultValue={name}
                        disabled
                    ></TextInput>
                </Col>
                <Col md={6}>
                    <Controller
                        name="ProductId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã sản phẩm"
                                data={listProductForSlect}
                                placeholder="Chọn mã sản phẩm"
                                nothingFound="Không tìm thấy"
                                searchable
                                withAsterisk
                                {...register('ProductId', {
                                    onChange: onProductIDChange,
                                })}
                                {...field}
                                error={errorProductId}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col md={6}>
                    <Controller
                        name="ProductName"
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
                        name="Amount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                placeholder="Số lượng trên kệ"
                                label="Số lượng trên kệ"
                                variant="filled"
                                {...field}
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
                <Col span={12}>
                    <Center>
                        <Button
                            color="green"
                            onClick={onAddProductInFloorClicked}
                        >
                            Thêm
                        </Button>
                        <Space w="md"></Space>
                        <Button
                            color="blue"
                            onClick={onUpdateProductInFloorClick}
                        >
                            Sửa
                        </Button>
                        <Space w="md"></Space>
                        <Button
                            color="red"
                            onClick={onDeleteProductInFloorClick}
                        >
                            Xóa
                        </Button>
                    </Center>
                </Col>
            </Grid>
        </>
    );
};

export default ProductInFloor;
