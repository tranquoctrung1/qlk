import { useDispatch, useSelector } from 'react-redux';
import { CurrentCabinetState } from '../features/currentCabinet';
import { FloorState } from '../features/floor';
import { HostnameState } from '../features/hostname';
import { ListProductState, addListProducts } from '../features/listProduct';

import { ActionIcon, Modal, Space, Table } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useEffect, useState } from 'react';

import Product from './product';
import ProductInFloor from './productInFloor';

import axios from 'axios';

const TableFloor = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const currentCabinet = useSelector(CurrentCabinetState);
    const floor = useSelector(FloorState);
    const hostname = useSelector(HostnameState);
    const listProduct = useSelector(ListProductState);

    const dispatch = useDispatch();

    const [opened, { open, close }] = useDisclosure(false);
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
                                <tr>
                                    <td
                                        rowspan={
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
                                    </td>
                                </tr>
                            );

                            firstRow = false;
                        } else {
                            content = (
                                <tr>
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
                                    </td>
                                </tr>
                            );
                        }
                        result.push(content);
                    }
                } else {
                    content = (
                        <tr>
                            <td>{item.FloorName}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
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

    return (
        <>
            <Table>
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
        </>
    );
};

export default TableFloor;
