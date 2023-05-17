import axios from 'axios';

import { Space, Text } from '@mantine/core';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { CurrentStockState } from '../features/currentStock';

import District3Stock from '../components/district3Stock';

import District8Stock from '../components/district8Stock';

import TableFloor from '../components/tableFloor';

import { HostnameState } from '../features/hostname';
import { ListProductState, addListProducts } from '../features/listProduct';

const DashBoardPage = () => {
    const currentStock = useSelector(CurrentStockState);
    const hostname = useSelector(HostnameState);
    const listProduct = useSelector(ListProductState);

    const dispatch = useDispatch();

    const getListProductByStockId = (id: string) => {
        let url = `${hostname}/GetListProductByStockId?id=${id}`;

        axios.get(url).then((res) => {
            if (res.status === 200) {
                dispatch(addListProducts(res.data));
            }
        });
    };

    useEffect(() => {
        getListProductByStockId(currentStock.id);
    }, [currentStock.id]);

    return (
        <>
            {currentStock.id !== '' ? (
                currentStock.id === '6442555b01aaf27652a38e66' ? (
                    <District8Stock />
                ) : (
                    <District3Stock />
                )
            ) : (
                <Text color="red" weight={500}>
                    Chưa chọn kho
                </Text>
            )}
            <Space h="md" />
            <TableFloor />
        </>
    );
};

export default DashBoardPage;
