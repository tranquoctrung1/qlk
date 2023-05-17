import { useDispatch, useSelector } from 'react-redux';
import {
    CurrentCabinetState,
    setCurrentCabinet,
} from '../features/currentCabinet';
import { CurrentStockState } from '../features/currentStock';
import { FloorState } from '../features/floor';
import { HostnameState } from '../features/hostname';
import {
    ListProductState,
    addListProducts,
    deleteProductToListProduct,
} from '../features/listProduct';

import {
    ActionIcon,
    Center,
    Modal,
    Space,
    Table,
    TextInput,
} from '@mantine/core';
import {
    IconArrowsExchange,
    IconPackageExport,
    IconPlus,
    IconReload,
    IconTrash,
} from '@tabler/icons-react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useCallback, useEffect, useState } from 'react';

import ExchangeProduct from './exchangeProduct';
import ExportProduct from './exportProduct';
import Product from './product';
import ProductInFloor from './productInFloor';

import axios from 'axios';

import Swal from 'sweetalert2';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { Link, Navigate } from 'react-router-dom';

// @ts-ignore
import _ from 'lodash';

import jwt_decode from 'jwt-decode';

const TableFloor = () => {
    const currentStock = useSelector(CurrentStockState);
    const currentCabinet = useSelector(CurrentCabinetState);
    const floor = useSelector(FloorState);
    const hostname = useSelector(HostnameState);
    const listProduct = useSelector(ListProductState);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cabinetId, setCabinetId] = useState('');
    const [cabinetName, setCabinetName] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState(0);
    const [baseAlarm, setBaseAlarm] = useState(0);
    const [importDate, setImportDate] = useState(0);
    const [productInFloorId, setProductInFloorId] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();

    const [opened, { open, close }] = useDisclosure(false);
    const [openedExportModal, exportModalHandle] = useDisclosure(false);
    const [openedExchageModal, exchangeModalHandle] = useDisclosure(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const getRoleAdmin = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to="/login" />;
        } else {
            // @ts-ignore
            let decodeToken = jwt_decode(token);
            // @ts-ignore
            return decodeToken.role === 'admin';
        }
    };

    const getListProductByStockId = (id: string) => {
        let url = `${hostname}/GetListProductByStockId?id=${id}`;

        axios.get(url).then((res) => {
            if (res.status === 200) {
                dispatch(addListProducts(res.data));
            }
        });
    };

    const getListProductByCabinetId = (id: string) => {
        let url = `${hostname}/GetListProductByCabinetId?id=${id}`;

        axios.get(url).then((res) => {
            if (res.status === 200) {
                if (res.data.length > 0) {
                    let temp = [];

                    for (let item of res.data) {
                        let obj = {
                            ...item,
                            CabinetId: currentCabinet.id,
                            CabinetName: currentCabinet.name,
                        };
                        temp.push(obj);
                    }

                    //@ts-ignore
                    dispatch(addListProducts(temp));
                }
            }
        });
    };

    useEffect(() => {
        setSearchValue('');
        getListProductByCabinetId(currentCabinet.id);
    }, [currentCabinet.id]);

    useEffect(() => {
        renderTable(listProduct);
    }, [listProduct]);

    const convertDateToString = (time: string) => {
        if (
            time !== null &&
            time !== undefined &&
            time.toString().trim() !== ''
        ) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : `0${date.getMonth() + 1}`;
            let day =
                date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
            let hours =
                date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
            let minute =
                date.getMinutes() >= 10
                    ? date.getMinutes()
                    : `0${date.getMinutes()}`;
            let second =
                date.getSeconds() >= 10
                    ? date.getSeconds()
                    : `0${date.getSeconds()}`;

            return `${day}/${month}/${year} ${hours}:${minute}:${second}`;
        }
        return '';
    };

    const renderTable = (data: any) => {
        let result = [];

        if (data.length > 0) {
            for (let item of data) {
                let content;

                if (item.ListProduct.length > 0) {
                    for (let product of item.ListProduct) {
                        let isOverBaseAlarm = false;
                        if (product.Amount <= product.BaseAlarm) {
                            isOverBaseAlarm = true;
                        }

                        content = (
                            <tr
                                key={product._id}
                                style={{
                                    backgroundColor: isOverBaseAlarm
                                        ? '#f1c40f'
                                        : '',
                                    color: isOverBaseAlarm ? 'black' : '',
                                }}
                            >
                                <td>{item.CabinetName}</td>
                                <td>{product.FloorName}</td>
                                <td>{product.ProductId}</td>
                                <td>{product.ProductName}</td>
                                <td>{product.Unit}</td>
                                <td>{product.Amount}</td>
                                <td>
                                    {convertDateToString(product.ImportDate)}
                                </td>
                                {getRoleAdmin() && (
                                    <td>
                                        <Center>
                                            <ActionIcon
                                                variant="filled"
                                                color="green"
                                                onClick={() =>
                                                    onAddProductClicked(
                                                        item.FloorId,
                                                        item.FloorName,
                                                        item.CabinetId,
                                                        item.CabinetName,
                                                        product.IdProduct,
                                                        product.ProductId,
                                                        product.ProductName,
                                                        product.Unit,
                                                        product.Amount,
                                                        product.BaseAlarm,
                                                        new Date(
                                                            product.ImportDate,
                                                        ).getTime(),
                                                        product._id,
                                                    )
                                                }
                                            >
                                                <IconPlus size="1.125rem" />
                                            </ActionIcon>
                                            {product.Amount > 0 &&
                                            product.Amount !== undefined ? (
                                                <>
                                                    <Space w="md" />
                                                    <ActionIcon
                                                        variant="filled"
                                                        color="violet"
                                                        onClick={() =>
                                                            onExportClicked(
                                                                item.FloorId,
                                                                item.FloorName,
                                                                item.CabinetId,
                                                                item.CabinetName,
                                                                product.IdProduct,
                                                                product.ProductId,
                                                                product.ProductName,
                                                                product.Unit,
                                                                product.Amount,
                                                                product._id,
                                                            )
                                                        }
                                                    >
                                                        <IconPackageExport size="1.125rem" />
                                                    </ActionIcon>
                                                </>
                                            ) : null}
                                            <Space w="md" />
                                            <ActionIcon
                                                variant="filled"
                                                color="lime"
                                                onClick={() =>
                                                    onExchangeClicked(
                                                        item.FloorId,
                                                        item.FloorName,
                                                        item.CabinetId,
                                                        item.CabinetName,
                                                        product.IdProduct,
                                                        product.ProductId,
                                                        product.ProductName,
                                                        product.Unit,
                                                        product.Amount,
                                                        product._id,
                                                    )
                                                }
                                            >
                                                <IconArrowsExchange size="1.125rem" />
                                            </ActionIcon>
                                            <Space w="md" />
                                            <ActionIcon
                                                variant="filled"
                                                color="red"
                                                onClick={() =>
                                                    onDeleteProductInFloorClicked(
                                                        product._id,
                                                        item.FloorId,
                                                    )
                                                }
                                            >
                                                <IconTrash size="1.125rem" />
                                            </ActionIcon>
                                        </Center>
                                    </td>
                                )}
                            </tr>
                        );

                        result.push(content);
                    }
                } else {
                    content = (
                        <tr key={item._id}>
                            <td>{item.CabinetName}</td>
                            <td>{item.FloorName}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {getRoleAdmin() && (
                                <td>
                                    <Center>
                                        <ActionIcon
                                            variant="filled"
                                            color="green"
                                            onClick={() =>
                                                onAddProductClicked(
                                                    item.FloorId,
                                                    item.FloorName,
                                                    item.CabinetId,
                                                    item.CabinetName,
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    0,
                                                    0,
                                                    new Date().getTime(),
                                                    '',
                                                )
                                            }
                                        >
                                            <IconPlus size="1.125rem" />
                                        </ActionIcon>
                                    </Center>
                                </td>
                            )}
                        </tr>
                    );

                    result.push(content);
                }
            }
        }

        return result;
    };

    const onAddProductClicked = (
        id: string,
        name: string,
        cabinetId: string,
        cabinetName: string,
        idProduct: string,
        productId: string,
        productName: string,
        unit: string,
        amount: number,
        baseAlarm: number,
        importDate: number,
        productInFloorId: string,
    ) => {
        setName(name);
        setId(id);
        setCabinetId(cabinetId);
        setCabinetName(cabinetName);
        setIdProduct(idProduct);
        setProductId(productId);
        setProductName(productName);
        setUnit(unit);
        setAmount(amount);
        setBaseAlarm(baseAlarm);
        setImportDate(importDate);
        setProductInFloorId(productInFloorId);
        open();
    };

    const onExportClicked = (
        id: string,
        name: string,
        cabinetId: string,
        cabinetName: string,
        idProduct: string,
        productId: string,
        productName: string,
        unit: string,
        amount: number,
        productInFloorId: string,
    ) => {
        setName(name);
        setId(id);
        setIdProduct(idProduct);
        setProductId(productId);
        setProductName(productName);
        setUnit(unit);
        setAmount(amount);
        setProductInFloorId(productInFloorId);
        setCabinetId(cabinetId);
        setCabinetName(cabinetName);

        exportModalHandle.open();
    };

    const onExchangeClicked = (
        id: string,
        name: string,
        cabinetId: string,
        cabinetName: string,
        idProduct: string,
        productId: string,
        productName: string,
        unit: string,
        amount: number,
        productInFloorId: string,
    ) => {
        setName(name);
        setId(id);
        setIdProduct(idProduct);
        setProductId(productId);
        setProductName(productName);
        setUnit(unit);
        setAmount(amount);
        setProductInFloorId(productInFloorId);
        setCabinetId(cabinetId);
        setCabinetName(cabinetName);

        exchangeModalHandle.open();
    };

    const handleDebounceFn = (value: string) => {
        let temp = [];

        for (let item of listProduct) {
            let tempListProduct = [];
            // @ts-ignore
            for (let product of item.ListProduct) {
                if (
                    product.ProductId.toLowerCase().indexOf(
                        value.toLowerCase(),
                    ) !== -1
                ) {
                    tempListProduct.push(product);
                }
            }

            if (tempListProduct.length > 0) {
                let obj = {
                    // @ts-ignore
                    CabinetId: item.CabinetId,
                    // @ts-ignore
                    CabinetName: item.CabinetName,
                    // @ts-ignore
                    FloorId: item.FloorId,
                    // @ts-ignore
                    FloorName: item.FloorName,
                    // @ts-ignore
                    ListProduct: tempListProduct,
                };

                temp.push(obj);
            }
        }
        //@ts-ignore
        setFilterData([...temp]);
    };

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 500), [
        listProduct,
    ]);

    const onSearchChanged = (e: any) => {
        setSearchValue(e.target.value);
        debounceFn(e.target.value);
    };

    const onRealoadClicked = () => {
        setSearchValue('');
        getListProductByStockId(currentStock.id);

        let obj = {
            id: '',
            name: '',
        };
        dispatch(setCurrentCabinet(obj));
    };

    const onDeleteProductInFloorClicked = (id: string, floorId: string) => {
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
                let url = `${hostname}/DeleteListProduct?id=${id}`;

                axios
                    .delete(url)
                    .then((res) => {
                        if (res.status == 200 && res.data > 0) {
                            let obj = {
                                _id: id,
                                FloorId: floorId,
                            };

                            dispatch(deleteProductToListProduct(obj));

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
            }
        });
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <TextInput
                    placeholder="Mã sản phẩm"
                    label="Tìm kiếm theo mã sản phẩm"
                    style={{ flex: '.5' }}
                    onChange={onSearchChanged}
                    value={searchValue}
                />

                <ActionIcon
                    color="indigo"
                    variant="filled"
                    onClick={onRealoadClicked}
                >
                    <IconReload size="1.125rem" />
                </ActionIcon>
            </div>
            <div style={{ overflow: 'scroll' }}>
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Tên kệ</th>
                            <th>Tên tầng</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Số lượng</th>
                            <th>Thời gian nhập kệ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchValue !== ''
                            ? renderTable(filterData)
                            : renderTable(listProduct)}
                    </tbody>
                </Table>
            </div>

            <Modal
                opened={opened}
                onClose={close}
                title="Sản phẩm"
                centered
                size="70%"
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <ProductInFloor
                    name={name}
                    id={id}
                    cabinetId={cabinetId}
                    cabinetName={cabinetName}
                    idProduct={idProduct}
                    productId={productId}
                    productName={productName}
                    amount={amount}
                    unit={unit}
                    baseAlarm={baseAlarm}
                    importDate={importDate}
                    productInFloorId={productInFloorId}
                />
                <Space h="md" />
                <hr />
                <Space h="md" />
                <Product name={name} id={id} />
            </Modal>

            <Modal
                opened={openedExportModal}
                onClose={exportModalHandle.close}
                title="Xuất sản phẩm"
                centered
                size="50%"
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <ExportProduct
                    floorName={name}
                    floorId={id}
                    idProduct={idProduct}
                    productName={productName}
                    productId={productId}
                    unit={unit}
                    amount={amount}
                    productInFloorId={productInFloorId}
                    cabinetId={cabinetId}
                    cabinetName={cabinetName}
                />
            </Modal>

            <Modal
                opened={openedExchageModal}
                onClose={exchangeModalHandle.close}
                title="Chuyển đổi sản phẩm"
                centered
                size="75%"
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <ExchangeProduct
                    floorName={name}
                    floorId={id}
                    idProduct={idProduct}
                    productName={productName}
                    productId={productId}
                    unit={unit}
                    amount={amount}
                    productInFloorId={productInFloorId}
                    cabinetId={cabinetId}
                    cabinetName={cabinetName}
                />
            </Modal>
        </>
    );
};

export default TableFloor;
