import ExchangeProductModalInterface from '../types/exchangeProduct.type';

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

import axios from 'axios';

import { DateTimePicker } from '@mantine/dates';

import { Controller, useForm } from 'react-hook-form';

import { CurrentCabinetState } from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { HostnameState } from '../features/hostname';

import {
    ListProductState,
    addOrUpdateProductToListProduct,
    deleteProductToListProduct,
    updateAmountProductToListProduct,
} from '../features/listProduct';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

const ExchangeProduct = ({
    floorId,
    floorName,
    idProduct,
    productId,
    productName,
    unit,
    amount,
    productInFloorId,
}: ExchangeProductModalInterface) => {
    const hostname = useSelector(HostnameState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const currentStock = useSelector(CurrentStockState);

    const [stocks, setStocks] = useState([]);
    const [stockForSelect, setStockForSelect] = useState([]);
    const [cabinets, setCabinets] = useState([]);
    const [cabinetsForSelect, setCabinetForSelect] = useState([]);
    const [floors, setFloors] = useState([]);
    const [floorsForSelect, setFloorsForSelect] = useState([]);

    const [errorAmount, setErrorAmount] = useState('');
    const [errorExchangeDate, setErrorExchangeDate] = useState('');
    const [errorSelectStock, setErrorSelectStock] = useState('');
    const [errorSelectCabinet, setErrorSelectCabinet] = useState('');
    const [errorSelectFloor, setErrorSelectFloor] = useState('');

    const dispatch = useDispatch();

    const { control, getValues, setValue, register, reset } = useForm({
        defaultValues: {
            IdFromStock: currentStock.id === undefined ? '' : currentStock.id,
            FromStockName:
                currentStock.name === undefined ? '' : currentStock.name,
            IdFromCabinet:
                currentCabinet.id === undefined ? '' : currentCabinet.id,
            FromCabinetName:
                currentCabinet.name === undefined ? '' : currentCabinet.name,
            IdFromFloor: floorId === undefined ? '' : floorId,
            FromFloorName: floorName === undefined ? '' : floorName,
            IdProduct: idProduct === undefined ? '' : idProduct,
            ProductId: productId === undefined ? '' : productId,
            ProductName: productName === undefined ? '' : productName,
            Unit: unit === undefined ? '' : unit,
            Amount: amount === undefined ? 0 : amount,
            IdToStock: '',
            ToStockName: '',
            IdToCabinet: '',
            ToCabinetName: '',
            IdToFloor: '',
            ToFloorName: '',
            ExchangeDate: new Date(),
        },
    });

    const getStocks = () => {
        let url = `${hostname}/GetStocks`;

        axios.get(url).then((res) => {
            if (res.status == 200 && res.data.length > 0) {
                let temp = [];
                for (let stock of res.data) {
                    let obj = {
                        value: stock._id,
                        label: stock.Name,
                    };

                    temp.push(obj);
                }
                //@ts-ignore
                setStocks([...res.data]);
                //@ts-ignore
                setStockForSelect([...temp]);
            }
        });
    };

    const getCabinets = () => {
        let url = `${hostname}/GetCabinets`;

        axios.get(url).then((res) => {
            if (res.status == 200 && res.data.length > 0) {
                //@ts-ignore
                setCabinets([...res.data]);
            }
        });
    };

    const getFloors = () => {
        let url = `${hostname}/GetFloors`;

        axios.get(url).then((res) => {
            if (res.status == 200 && res.data.length > 0) {
                //@ts-ignore
                setFloors([...res.data]);
            }
        });
    };

    useEffect(() => {
        getStocks();
        getCabinets();
        getFloors();
    }, []);

    const onStockChanged = (e: any) => {
        //@ts-ignore
        let find = stocks.find((el) => el._id === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('IdToStock', find._id);
            //@ts-ignore
            setValue('ToStockName', find.Name);
        }

        let temp = [];
        for (let cabinet of cabinets) {
            // @ts-ignore
            if (cabinet.IdStock === e) {
                let obj = {
                    // @ts-ignore
                    value: cabinet._id,
                    // @ts-ignore
                    label: cabinet.Name,
                };

                temp.push(obj);
            }
        }
        // @ts-ignore
        setCabinetForSelect([...temp]);
    };

    const onCabinetChanged = (e: any) => {
        //@ts-ignore
        let find = cabinets.find((el) => el._id === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('IdToCabinet', find._id);
            //@ts-ignore
            setValue('ToCabinetName', find.Name);
        }

        let temp = [];

        for (let floor of floors) {
            // @ts-ignore
            if (floor.IdCabinet === e) {
                let obj = {
                    // @ts-ignore
                    value: floor._id,
                    // @ts-ignore
                    label: floor.Name,
                };

                temp.push(obj);
            }
        }
        // @ts-ignore
        setFloorsForSelect([...temp]);
    };

    const onFloorChanged = (e: any) => {
        //@ts-ignore
        let find = floors.find((el) => el._id === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('IdToFloor', find._id);
            //@ts-ignore
            setValue('ToFloorName', find.Name);
        }
    };

    const onExchangeClicked = () => {
        let formValue = getValues();
        let isAllow = true;

        if (
            formValue.ToStockName === undefined ||
            formValue.ToStockName === null ||
            formValue.ToStockName === ''
        ) {
            setErrorSelectStock('Kho chuyển hàng đến phải có giá trị!!!');
            isAllow = false;
        } else {
            setErrorSelectStock('');
        }

        if (
            formValue.ToCabinetName === undefined ||
            formValue.ToCabinetName === null ||
            formValue.ToCabinetName == ''
        ) {
            setErrorSelectCabinet('Kệ chuyển hàng đến phải có giá trị!!!');
            isAllow = false;
        } else {
            setErrorSelectCabinet('');
        }
        if (
            formValue.ToFloorName === undefined ||
            formValue.ToFloorName === null ||
            formValue.ToFloorName == ''
        ) {
            setErrorSelectFloor('Tầng chuyển hàng đến phải có giá trị!!!');
            isAllow = false;
        } else {
            setErrorSelectFloor('');
        }

        if (
            formValue.Amount === undefined ||
            formValue.Amount === null ||
            formValue.Amount == 0 ||
            formValue.Amount > amount
        ) {
            setErrorAmount(
                'Số lượng không được trống hoặc là nhỏ hơn số lượng đã có trong kệ!!!',
            );
            isAllow = false;
        } else {
            setErrorAmount('');
        }

        if (
            formValue.ExchangeDate === undefined ||
            formValue.ExchangeDate === null
        ) {
            setErrorExchangeDate('Ngày chuyển sản phẩm phải có giá trị!!!');
            isAllow = false;
        } else {
            setErrorExchangeDate('');
        }

        if (isAllow) {
            console.log(formValue);

            Swal.fire({
                title: 'Bạn có chắc muốn chuyển sản phẩm này?',
                text: 'Thinking before you click!!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0f0',
                confirmButtonText: 'Chuyển',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    let urlInsertExchangeHistory = `${hostname}/InsertExchangeHistory`;
                    let urlUpdateAmountListProduct = `${hostname}/UpdateAmountListProduct`;
                    let urlInsertOrUpdateProductToListProduct = `${hostname}/InsertOrUpdateProductToListProduct`;

                    let objUpdateAmount = {
                        _id: productInFloorId,
                        id: productInFloorId,
                        amount: amount - formValue.Amount,
                        FloorId: floorId,
                    };

                    let objAddOrUpdateProductToListProduct = {
                        IdProduct: formValue.IdProduct,
                        ProductId: formValue.ProductId,
                        ProductName: formValue.ProductName,
                        FloorId: formValue.IdToFloor,
                        FloorName: formValue.ToFloorName,
                        Amount: formValue.Amount,
                        ImportDate: formValue.ExchangeDate.getTime(),
                        Unit: formValue.Unit,
                    };

                    //@ts-ignore
                    formValue.ExchangeDate = formValue.ExchangeDate.getTime();

                    let insertExchangeHistory = axios.post(
                        urlInsertExchangeHistory,
                        formValue,
                    );

                    let updateAmountListProduct = axios.patch(
                        urlUpdateAmountListProduct,
                        objUpdateAmount,
                    );

                    let insertProductToListProduct = axios.post(
                        urlInsertOrUpdateProductToListProduct,
                        objAddOrUpdateProductToListProduct,
                    );

                    Promise.all([
                        updateAmountListProduct,
                        insertExchangeHistory,
                        insertProductToListProduct,
                    ])
                        .then((res) => {
                            if (
                                res[0].status === 200 &&
                                res[1].status === 200 &&
                                res[2].status === 200
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

                                dispatch(
                                    addOrUpdateProductToListProduct(
                                        objAddOrUpdateProductToListProduct,
                                    ),
                                );

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Chuyển sản phẩm thành công',
                                    showConfirmButton: true,
                                    timer: 1000,
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Chuyển sản phẩm thành công',
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
                    placeholder="Từ kho"
                    label="Từ kho"
                    defaultValue={currentStock.name}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <TextInput
                    placeholder="Từ kệ"
                    label="Từ kệ"
                    defaultValue={currentCabinet.name}
                    disabled
                ></TextInput>
            </Col>
            <Col md={6}>
                <TextInput
                    placeholder="Từ tầng"
                    label="Từ tầng"
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
                <Select
                    label="Đến kho"
                    placeholder="Đến kho"
                    searchable
                    nothingFound="Không tìm thấy"
                    withAsterisk
                    data={stockForSelect}
                    onChange={onStockChanged}
                    error={errorSelectStock}
                />
            </Col>
            <Col md={6}>
                <Select
                    label="Đến kệ"
                    placeholder="Đến kệ"
                    searchable
                    withAsterisk
                    nothingFound="Không tìm thấy"
                    data={cabinetsForSelect}
                    onChange={onCabinetChanged}
                    error={errorSelectCabinet}
                />
            </Col>
            <Col md={6}>
                <Select
                    label="Đến tầng"
                    placeholder="Đến tầng"
                    searchable
                    withAsterisk
                    nothingFound="Không tìm thấy"
                    data={floorsForSelect}
                    onChange={onFloorChanged}
                    error={errorSelectFloor}
                />
            </Col>
            <Col md={6}>
                <Controller
                    name="Amount"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            placeholder="Số lượng chuyển"
                            label="Số lượng chuyển"
                            variant="filled"
                            withAsterisk
                            {...field}
                            error={errorAmount}
                        />
                    )}
                ></Controller>
            </Col>
            <Col md={6}>
                <Controller
                    name="ExchangeDate"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            clearable
                            defaultValue={getValues().ExchangeDate}
                            placeholder="Ngày chuyển"
                            label="Ngày chuyển"
                            withAsterisk
                            {...field}
                            mx="auto"
                            error={errorExchangeDate}
                        />
                    )}
                ></Controller>
            </Col>
            <Col span={12}>
                <Center>
                    <Button
                        color="lime"
                        variant="filled"
                        onClick={onExchangeClicked}
                    >
                        Chuyển
                    </Button>
                </Center>
            </Col>
        </Grid>
    );
};

export default ExchangeProduct;
