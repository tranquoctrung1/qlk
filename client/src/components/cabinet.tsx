import { Box } from '@mantine/core';
import axios from 'axios';
import CabinetInterface from '../types/cabinet.type';

import { useDispatch, useSelector } from 'react-redux';

import { HostnameState } from '../features/hostname';

import { setCurrentCabinet } from '../features/currentCabinet';

import { addFloor } from '../features/floor';

const Cabinet = ({ name, id, isCabinet }: CabinetInterface) => {
    const hostname = useSelector(HostnameState);

    const dispatch = useDispatch();

    const onCabinetClicked = (cabinetId: string | undefined, name: string) => {
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

    return (
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
    );
};

export default Cabinet;
