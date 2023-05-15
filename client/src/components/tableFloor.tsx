import { useDispatch, useSelector } from 'react-redux';
import { CurrentCabinetState } from '../features/currentCabinet';
import { FloorState } from '../features/floor';
import { HostnameState } from '../features/hostname';
import { ListProductState, addListProducts } from '../features/listProduct';

import { ActionIcon, Center, Modal, Space, Table } from '@mantine/core';
import {
	IconArrowsExchange,
	IconPackageExport,
	IconPlus,
} from '@tabler/icons-react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useEffect, useState } from 'react';

import ExchangeProduct from './exchangeProduct';
import ExportProduct from './exportProduct';
import Product from './product';
import ProductInFloor from './productInFloor';

import axios from 'axios';

const TableFloor = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState(0);
    const [productInFloorId, setProductInFloorId] = useState('');

    const currentCabinet = useSelector(CurrentCabinetState);
    const floor = useSelector(FloorState);
    const hostname = useSelector(HostnameState);
    const listProduct = useSelector(ListProductState);

    const dispatch = useDispatch();

    const [opened, { open, close }] = useDisclosure(false);
    const [openedExportModal, exportModalHandle] = useDisclosure(false);
    const [openedExchageModal, exchangeModalHandle] = useDisclosure(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const getListProductByCabinetId = (id: string) => {
        let url = `${hostname}/GetListProductByCabinetId?id=${id}`;

        axios.get(url).then((res) => {
            if (res.status === 200) {
                if (res.data.length > 0) {
                    dispatch(addListProducts(res.data));
                }
            }
        });
    };

    useEffect(() => {
        getListProductByCabinetId(currentCabinet.id);
    }, [currentCabinet]);

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
                let firstRow = true;
                let content;

                if (item.ListProduct.length > 0) {
                    for (let product of item.ListProduct) {
                        if (firstRow == true) {
                            content = (
                                <tr key={product._id}>
                                    <td
                                        rowSpan={
                                            item.ListProduct.length == 0
                                                ? 1
                                                : item.ListProduct.length
                                        }
                                    >
                                        {item.FloorName}
                                    </td>
                                    <td>{product.ProductId}</td>
                                    <td>{product.ProductName}</td>
                                    <td>{product.Unit}</td>
                                    <td>{product.Amount}</td>
                                    <td>
                                        {convertDateToString(
                                            product.ImportDate,
                                        )}
                                    </td>
                                    <td>
                                        <Center>
                                            <ActionIcon
                                                variant="filled"
                                                color="green"
                                                onClick={() =>
                                                    onAddProductClicked(
                                                        item.FloorId,
                                                        item.FloorName,
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
                                        </Center>
                                    </td>
                                </tr>
                            );

                            firstRow = false;
                        } else {
                            content = (
                                <tr key={product._id}>
                                    <td>{product.ProductId}</td>
                                    <td>{product.ProductName}</td>
                                    <td>{product.Unit}</td>
                                    <td>{product.Amount}</td>
                                    <td>
                                        {convertDateToString(
                                            product.ImportDate,
                                        )}
                                    </td>
                                    <td>
                                        <Center>
                                            <ActionIcon
                                                variant="filled"
                                                color="green"
                                                onClick={() =>
                                                    onAddProductClicked(
                                                        item.FloorId,
                                                        item.FloorName,
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
                                        </Center>
                                    </td>
                                </tr>
                            );
                        }
                        result.push(content);
                    }
                } else {
                    content = (
                        <tr key={item._id}>
                            <td>{item.FloorName}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Center>
                                    <ActionIcon
                                        variant="filled"
                                        color="green"
                                        onClick={() =>
                                            onAddProductClicked(
                                                item.FloorId,
                                                item.FloorName,
                                            )
                                        }
                                    >
                                        <IconPlus size="1.125rem" />
                                    </ActionIcon>
                                </Center>
                            </td>
                        </tr>
                    );

                    result.push(content);
                }
            }
        }

        return result;
    };

    const onAddProductClicked = (id: string, name: string) => {
        setName(name);
        setId(id);
        open();
    };

    const onExportClicked = (
        id: string,
        name: string,
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

        exportModalHandle.open();
    };

    const onExchangeClicked = (
        id: string,
        name: string,
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

        exchangeModalHandle.open();
    };

    return (
        <>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Tên tầng</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Thời gian nhập kệ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{renderTable(listProduct)}</tbody>
            </Table>

            <Modal
                opened={opened}
                onClose={close}
                title="Sản phẩm"
                centered
                size="70%"
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <ProductInFloor name={name} id={id} />
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
                />
            </Modal>
        </>
    );
};

export default TableFloor;
