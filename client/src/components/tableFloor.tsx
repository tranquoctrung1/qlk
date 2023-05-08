import { useDispatch, useSelector } from 'react-redux';
import { FloorState } from '../features/floor';

import { ActionIcon, Modal, Table } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useEffect, useState } from 'react';

import Product from './product';
const TableFloor = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const floor = useSelector(FloorState);

    useEffect(() => {
        console.log(floor);
    }, [floor]);

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
                        <th>Element position</th>
                        <th>Element name</th>
                        <th>Symbol</th>
                        <th>Atomic mass</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {floor.map((el) => (
                        // @ts-ignore
                        <tr key={el._id}>
                            {/* @ts-ignore */}
                            <td>{el.Name}</td>
                            {/* @ts-ignore */}
                            <td>{el.Name}</td>
                            {/* @ts-ignore */}
                            <td>{el.Name}</td>
                            {/* @ts-ignore */}
                            <td>{el.Name}</td>
                            {/* @ts-ignore */}
                            <td>
                                <ActionIcon
                                    variant="filled"
                                    color="green"
                                    onClick={() =>
                                        // @ts-ignore
                                        onAddProductClicked(el._id, el.Name)
                                    }
                                >
                                    <IconPlus size="1.125rem" />
                                </ActionIcon>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                opened={opened}
                onClose={close}
                title="Authentication"
                centered
                size="70%"
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <Product name={name} id={id} />
            </Modal>
        </>
    );
};

export default TableFloor;
