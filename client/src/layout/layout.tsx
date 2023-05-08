import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    ColorSchemeProvider,
    Header,
    Image,
    MantineProvider,
    MediaQuery,
    Menu,
    Navbar,
    Space,
    Text,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import Logo from '../assets/logo.png';

import { NavbarNested } from './navbar';

import { IconMenu2, IconPower } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';

import IconChangeTheme from '../components/iconChangeTheme';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { OpenState, toggle } from '../features/openSidebar';

import { HostnameState } from '../features/hostname';

import { StockState, addStock } from '../features/stock';

import { setCurrentStock } from '../features/currentStock';

import axios from 'axios';

const Layout = () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme-xntd',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value: string) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const open = useSelector(OpenState);
    const hostname = useSelector(HostnameState);
    const stock = useSelector(StockState);

    const dispatch = useDispatch();

    const onOpenSidebarClicked = () => {
        dispatch(toggle());
    };

    const getStock = () => {
        let url = `${hostname}/GetStocks`;
        axios
            .get(url)
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch(addStock(res.data));

                    let obj = {
                        name: res.data[0].Name,
                        id: res.data[0]._id,
                    };

                    dispatch(setCurrentStock(obj));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getStock();
    }, []);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');

        navigate('/login');
    };

    const setCurrentStockOnClicked = (stock: any) => {
        let obj = {
            name: stock.Name,
            id: stock._id,
        };
        dispatch(setCurrentStock(obj));
    };

    return (
        <ColorSchemeProvider
            // @ts-ignore comment
            colorScheme={colorScheme}
            // @ts-ignore comment
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                // @ts-ignore comment
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <div className="main" style={{ background: '#ecf0f12b' }}>
                    <AppShell
                        padding="md"
                        navbarOffsetBreakpoint="sm"
                        navbar={
                            <Navbar
                                hiddenBreakpoint="sm"
                                hidden={!open}
                                width={{ sm: 300 }}
                                p="xs"
                                style={{
                                    boxShadow: '0 0 5px 0 rgba(0, 0, 0, .1)',
                                }}
                            >
                                <NavbarNested />
                            </Navbar>
                        }
                        header={
                            <Header
                                height={60}
                                p="xs"
                                style={{
                                    boxShadow: '0 0 5px 0 rgba(0, 0, 0, .1)',
                                    borderBottom: '0',
                                    padding: '0 15px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <MediaQuery
                                        largerThan="sm"
                                        styles={{ display: 'none' }}
                                    >
                                        <Burger
                                            opened={open}
                                            onClick={onOpenSidebarClicked}
                                            size="sm"
                                            mr="xl"
                                        />
                                    </MediaQuery>
                                    <Image
                                        width={50}
                                        radius="md"
                                        src={Logo}
                                        alt="Random unsplash image"
                                    />
                                    <Text
                                        size="lg"
                                        weight={500}
                                        variant="gradient"
                                        gradient={{
                                            from: 'blue',
                                            to: 'aqua',
                                            deg: 45,
                                        }}
                                        transform="uppercase"
                                    >
                                        Quản Lý Kho | Cúp
                                    </Text>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            size="sm"
                                            weight={500}
                                            transform="uppercase"
                                        >
                                            {localStorage.getItem('username')}
                                        </Text>
                                        <Space w="md" />
                                        <ActionIcon
                                            color="teal"
                                            variant="filled"
                                            onClick={onLogoutClick}
                                        >
                                            <IconPower size="1.125rem" />
                                        </ActionIcon>
                                        <Space w="md" />
                                        <IconChangeTheme />
                                        <Space w="md" />
                                        {/* Menu stock */}
                                        {stock.length > 0 && (
                                            <Menu shadow="md">
                                                <Menu.Target>
                                                    <ActionIcon
                                                        color="indigo"
                                                        variant="filled"
                                                    >
                                                        <IconMenu2 size="1.125rem"></IconMenu2>
                                                    </ActionIcon>
                                                </Menu.Target>

                                                <Menu.Dropdown>
                                                    <Menu.Label>Kho</Menu.Label>
                                                    {stock.map((el) => {
                                                        return (
                                                            <Menu.Item
                                                                // @ts-ignore
                                                                key={el._id}
                                                                onClick={() =>
                                                                    setCurrentStockOnClicked(
                                                                        // @ts-ignore
                                                                        el,
                                                                    )
                                                                }
                                                            >
                                                                {/* @ts-ignore */}
                                                                {el.Name}
                                                            </Menu.Item>
                                                        );
                                                    })}
                                                </Menu.Dropdown>
                                            </Menu>
                                        )}
                                    </div>
                                </div>
                            </Header>
                        }
                    >
                        <AnimatePresence>
                            <div id="detail">
                                {localStorage.getItem('username') &&
                                localStorage.getItem('username') === 'admin' ? (
                                    <Outlet />
                                ) : (
                                    <Navigate to="/login" />
                                )}
                            </div>
                        </AnimatePresence>
                    </AppShell>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default Layout;
