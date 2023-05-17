import {
    Code,
    createStyles,
    Group,
    Navbar,
    ScrollArea,
    Text,
} from '@mantine/core';
import {
    IconArrowsExchange,
    IconMapPin,
    IconPackageExport,
    IconUserCircle,
} from '@tabler/icons-react';
import { LinksGroup } from './navbarLinkGroup';

import { Navigate, useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

const mockdataAdmin = [
    {
        label: 'Tổng quan',
        icon: IconMapPin,
        links: [{ label: 'Tổng quan', link: '/' }],
    },
    {
        label: 'Lịch sử xuất hàng',
        icon: IconPackageExport,
        links: [{ label: 'Lịch sử xuất hàng', link: '/export' }],
    },
    {
        label: 'Lịch sử chuyển hàng',
        icon: IconArrowsExchange,
        links: [{ label: 'Lịch sử chuyển hàng', link: '/exchange' }],
    },
    {
        label: 'Tạo tài khoản',
        icon: IconUserCircle,
        links: [{ label: 'Tạo tài khoản', link: '/user' }],
    },
];

const mockdataStaff = [
    {
        label: 'Tổng quan',
        icon: IconMapPin,
        links: [{ label: 'Tổng quan', link: '/' }],
    },
    {
        label: 'Lịch sử xuất hàng',
        icon: IconPackageExport,
        links: [{ label: 'Lịch sử xuất hàng', link: '/export' }],
    },
    {
        label: 'Lịch sử chuyển hàng',
        icon: IconArrowsExchange,
        links: [{ label: 'Lịch sử chuyển hàng', link: '/exchange' }],
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export function NavbarNested() {
    const navigate = useNavigate();

    const { classes } = useStyles();

    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    //@ts-ignore
    let decodeToken = jwt_decode(token);
    let links;

    //@ts-ignore
    if (decodeToken.role === 'admin') {
        links = mockdataAdmin.map((item) => (
            <LinksGroup {...item} key={item.label} />
        ));
    } else {
        links = mockdataStaff.map((item) => (
            <LinksGroup {...item} key={item.label} />
        ));
    }

    return (
        <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <Text color="blue" weight={500} size="md">
                        Xưởng Cúp Nghĩa Lê
                    </Text>
                    <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>
        </Navbar>
    );
}
