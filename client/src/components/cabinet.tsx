import { Box, Center, Space, Text, Tooltip } from '@mantine/core';
import axios from 'axios';
import CabinetInterface from '../types/cabinet.type';

import { useDispatch, useSelector } from 'react-redux';

import { HostnameState } from '../features/hostname';

import { ListProductState } from '../features/listProduct';

import { setCurrentCabinet } from '../features/currentCabinet';

import { addFloor } from '../features/floor';

import { useEffect, useState } from 'react';

const Cabinet = ({ name, id, isCabinet }: CabinetInterface) => {
    const hostname = useSelector(HostnameState);
    const listProduct = useSelector(ListProductState);
    const [opened, setOpened] = useState(false);
    const [isOverBaseAlarm, setIsOverBaseAlarm] = useState(false);
    const [contentTooltip, setContentTooltip] = useState([]);

    const dispatch = useDispatch();

    const onCabinetClicked = (cabinetId: string | undefined, name: string) => {
        setOpened(!opened);
        if (isCabinet) {
            if (cabinetId !== undefined) {
                let obj = {
                    name: name,
                    id: cabinetId,
                };
                dispatch(setCurrentCabinet(obj));

                let url = `${hostname}/GetFloorByCabinetId?id=${cabinetId}`;

                axios
                    .get(url)
                    .then((res) => {
                        if (res.data.length > 0) {
                            dispatch(addFloor(res.data));
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    useEffect(() => {
        if (isCabinet) {
            //@ts-ignore
            let filter = listProduct.filter((el) => el.CabinetId === id);
            if (filter.length > 0) {
                let result = [];
                let overBaseAlarm = false;
                for (let floor of filter) {
                    //@ts-ignore
                    for (let product of floor.ListProduct) {
                        if (product.Amount <= product.BaseAlarm) {
                            overBaseAlarm = true;
                            let content = (
                                <Center>
                                    <Text>{product.FloorName}</Text>
                                    <Space w="md" />
                                    <Text>Mã: {product.ProductId}</Text>
                                    <Space w="md" />
                                    <Text>Số lượng: {product.Amount}</Text>

                                    <Space w="md" />
                                    <Text>Ngưởng: {product.BaseAlarm}</Text>
                                </Center>
                            );

                            result.push(content);
                        }
                    }
                }
                //@ts-ignore
                setContentTooltip([...result]);
                setIsOverBaseAlarm(overBaseAlarm);
            }
        }
    }, [listProduct]);

    return (
        <Tooltip
            label={contentTooltip}
            color="indigo"
            withArrow
            transitionProps={{ transition: 'scale-y', duration: 300 }}
            opened={opened}
        >
            <Box
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    border: '1px solid',
                    cursor: 'pointer',
                    transition: 'all .2s ease-in-out',
                    backgroundColor: isOverBaseAlarm ? '#f1c40f' : '',
                    color: isOverBaseAlarm ? 'black' : '',
                }}
                sx={(theme) => ({
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[5]
                                : theme.colors.gray[1],
                    },
                })}
                onClick={() => onCabinetClicked(id, name)}
            >
                {name}
            </Box>
        </Tooltip>
    );
};

export default Cabinet;
