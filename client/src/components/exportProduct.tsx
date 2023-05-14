import {
    Button,
    Center,
    Col,
    Grid,
    NumberInput,
    Space,
    TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import ExportProductModalInterface from '../types/exportProduct.type';

import { useDispatch, useSelector } from 'react-redux';
import { CurrentCabinetState } from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { HostnameState } from '../features/hostname';
import {
    ListProductState,
    deleteProductToListProduct,
    updateAmountProductToListProduct,
} from '../features/listProduct';

import axios from 'axios';

import Swal from 'sweetalert2';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

const ExportProduct = ({
    floorId,
    floorName,
    idProduct,
    productId,
    productName,
    unit,
    amount,
    productInFloorId,
}: ExportProductModalInterface) => {
    const hostname = useSelector(HostnameState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const currentStock = useSelector(CurrentStockState);
    const listProduct = useSelector(ListProductState);

    const [errorExportDate, setErrorExportDate] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    const dispatch = useDispatch();

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            IdProduct: idProduct === undefined ? '' : idProduct,
            ProductId: productId === undefined ? '' : productId,
            ProductName: productName === undefined ? '' : productName,
            FloorId: floorId === undefined ? '' : floorId,
            FloorName: floorName === undefined ? '' : floorName,
            CabinetId: currentCabinet.id === undefined ? '' : currentCabinet.id,
            CabinetName:
                currentCabinet.name === undefined ? '' : currentCabinet.name,
            StockId: currentStock.id === undefined ? '' : currentStock.id,
            StockName: currentStock.name === undefined ? '' : currentStock.name,
            Amount: amount === undefined ? 0 : amount,
            ExportDate: new Date(),
            Unit: unit === undefined ? '' : unit,
        },
    });

    const onExportProductClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.Amount === undefined ||
            formValue.Amount === null ||
            formValue.Amount === 0
        ) {
            setErrorAmount('Số lượng xuất không được trống hoặc lớn hơn 0 !!!');
            isAllow = false;
        } else {
            setErrorAmount('');
        }

        if (amount !== undefined) {
            if (formValue.Amount > amount) {
                setErrorAmount(
                    'Số lượng xuất không được lớn hơn số lượng có trong kệ !!!',
                );
                isAllow = false;
            }
        }

        if (
            formValue.ExportDate === null ||
            formValue.ExportDate === undefined ||
            formValue.ExportDate.toString() === ''
        ) {
            setErrorExportDate('Ngày xuất không được trống!!!');
            isAllow = false;
        } else {
            setErrorExportDate('');
        }

        if (isAllow) {
            Swal.fire({
                title: 'Bạn có chắc muốn xuất sản phẩm này?',
                text: 'Thinking before you click!!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0f0',
                confirmButtonText: 'Xuất',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    let urlInsertExport = `${hostname}/InsertExportHistory`;
                    let urlUpdateAmountListProduct = `${hostname}/UpdateAmountListProduct`;

                    let objUpdateAmount = {
                        _id: productInFloorId,
                        id: productInFloorId,
                        amount: amount - formValue.Amount,
                        FloorId: floorId,
                    };

                    let insertExport = axios.post(urlInsertExport, formValue);
                    let updateAmountListProduct = axios.patch(
                        urlUpdateAmountListProduct,
                        objUpdateAmount,
                    );

                    Promise.all([updateAmountListProduct, insertExport])
                        .then((res) => {
                            if (
                                res[0].status === 200 &&
                                res[1].status === 200
                            ) {
                                if (objUpdateAmount.amount > 0) {
                                    dispatch(
                                        updateAmountProductToListProduct(
                                            objUpdateAmount,
                                        ),
                                    );
                                } else {
                                    dispatch(
                                        deleteProductToListProduct(
                                            objUpdateAmount,
                                        ),
                                    );
                                }
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Xuất sản phẩm thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Xuất sản phẩm thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            }
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    };

    return (
        <Grid>
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
                    defaultValue={floorName}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <TextInput
                    placeholder="Mã sản phẩm"
                    label="Mã sản phẩm"
                    defaultValue={productId}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <TextInput
                    placeholder="Tên sản phẩm"
                    label="Tên sản phẩm"
                    defaultValue={productName}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <TextInput
                    placeholder="Đơn vị"
                    label="Đơn vị"
                    defaultValue={unit}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <Controller
                    name="Amount"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            placeholder="Số lượng xuất"
                            label="Số lượng xuất"
                            variant="filled"
                            {...field}
                            error={errorAmount}
                        />
                    )}
                ></Controller>
            </Col>
            <Col md={6}>
                <Controller
                    name="ExportDate"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            clearable
                            defaultValue={getValues().ExportDate}
                            placeholder="Ngày xuất"
                            label="Ngày xuất"
                            withAsterisk
                            {...field}
                            mx="auto"
                            error={errorExportDate}
                        />
                    )}
                ></Controller>
            </Col>
            <Col span={12}>
                <Center>
                    <Button
                        color="violet"
                        variant="filled"
                        onClick={onExportProductClicked}
                    >
                        Xuất hàng
                    </Button>
                </Center>
            </Col>
        </Grid>
    );
};

export default ExportProduct;
