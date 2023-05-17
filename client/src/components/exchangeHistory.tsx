import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { IconArrowBadgeUpFilled } from '@tabler/icons-react';

import { Button, Center, Col, Grid, Space, Text } from '@mantine/core';

import { DateTimePicker } from '@mantine/dates';

import { HostnameState } from '../features/hostname';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { useEffect, useState } from 'react';

const ExchangeHistory = () => {
    const hostname = useSelector(HostnameState);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');

    const getExchangeHistory = () => {
        let url = `${hostname}/GetListExchangeHistory`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        // @ts-ignore
                        setData([...res.data]);
                        setStartDate(
                            // @ts-ignore
                            new Date(
                                res.data[res.data.length - 1].ExchangeDate,
                            ),
                        );
                        // @ts-ignore
                        setEndDate(new Date(res.data[0].ExchangeDate));

                        setTitle(
                            `Danh sách các sản phẩm đã chuyển từ ngày ${convertDateNotTimeToString(
                                res.data[res.data.length - 1].ExchangeDate,
                            )} đến ngày ${convertDateNotTimeToString(
                                res.data[0].ExchangeDate,
                            )}`,
                        );
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    const getExchangeHistoryByTimeStamp = (start: any, end: any) => {
        let url = `${hostname}/GetListExchangeHistoryByTimeStamp?start=${start}&end=${end}`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        // @ts-ignore
                        setData([...res.data]);
                        setStartDate(
                            // @ts-ignore
                            new Date(
                                res.data[res.data.length - 1].ExchangeDate,
                            ),
                        );
                        // @ts-ignore
                        setEndDate(new Date(res.data[0].ExchangeDate));

                        setTitle(
                            `Danh sách các sản phẩm đã chuyển từ ngày ${convertDateNotTimeToString(
                                res.data[res.data.length - 1].ExchangeDate,
                            )} đến ngày ${convertDateNotTimeToString(
                                res.data[0].ExchangeDate,
                            )}`,
                        );
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getExchangeHistory();
    }, []);

    const convertDateToString = (time: any) => {
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

    const convertDateNotTimeToString = (time: any) => {
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

            return `${day}/${month}/${year}`;
        }
        return '';
    };

    const columns = [
        {
            name: 'Từ kho',
            selector: (row: any) => row.FromStockName,
            sortable: true,
            cellExport: (row: any) => row.FromStockName,
        },
        {
            name: 'Từ kệ',
            selector: (row: any) => row.FromCabinetName,
            sortable: true,
            cellExport: (row: any) => row.FromCabinetName,
        },
        {
            name: 'Từ tầng',
            selector: (row: any) => row.FromFloorName,
            sortable: true,
            cellExport: (row: any) => row.FromFloorName,
        },
        {
            name: 'Đến kho',
            selector: (row: any) => row.ToStockName,
            sortable: true,
            cellExport: (row: any) => row.ToStockName,
        },
        {
            name: 'Đến kệ',
            selector: (row: any) => row.ToCabinetName,
            sortable: true,
            cellExport: (row: any) => row.ToCabinetName,
        },
        {
            name: 'Đến tầng',
            selector: (row: any) => row.ToFloorName,
            sortable: true,
            cellExport: (row: any) => row.ToFloorName,
        },
        {
            name: 'Mã sản phẩm',
            selector: (row: any) => row.ProductId,
            sortable: true,
            cellExport: (row: any) => row.ProductId,
        },
        {
            name: 'Tên sản phẩm',
            selector: (row: any) => row.ProductName,
            sortable: true,
            cellExport: (row: any) => row.ProductName,
        },
        {
            name: 'Đơn vị',
            selector: (row: any) => row.Unit,
            sortable: true,
            cellExport: (row: any) => row.Unit,
        },
        {
            name: 'Ngày chuyển',
            selector: (row: any) => row.ExchangeDate,
            format: (row: any) => convertDateToString(row.ExchangeDate),
            sortable: true,
            cellExport: (row: any) => row.ExchangeDate,
        },
        {
            name: 'Số lượng',
            selector: (row: any) => row.Amount,
            sortable: true,
            cellExport: (row: any) => row.Amount,
        },
    ];

    const tableData = {
        columns,
        data,
    };

    const onChangeStartDate = (e: any) => {
        setStartDate(e);
    };

    const onChangeEndDate = (e: any) => {
        setEndDate(e);
    };

    const onViewExchangeHistoryClicked = () => {
        let isAllow = true;
        if (startDate === null || startDate === undefined) {
            setErrorStartDate('Thời gian bắt đầu không được trống!!!');
            isAllow = false;
        } else {
            setErrorStartDate('');
        }

        if (endDate === null || endDate === undefined) {
            setErrorEndDate('Thời gian kết thúc không được trống!!!');
            isAllow = false;
        } else {
            setErrorEndDate('');
        }

        if (isAllow) {
            // @ts-ignore
            let totalMilisecondStart = startDate.getTime();
            // @ts-ignore
            let totalMilisecondEnd = endDate.getTime();

            getExchangeHistoryByTimeStamp(
                totalMilisecondStart,
                totalMilisecondEnd,
            );
        }
    };

    return (
        <>
            <Grid>
                <Col md={5}>
                    <DateTimePicker
                        clearable
                        label="Thời gian bắt đầu"
                        value={startDate}
                        placeholder="Thời gian bắt đầu"
                        withAsterisk
                        mx="auto"
                        error={errorStartDate}
                        onChange={onChangeStartDate}
                    />
                </Col>
                <Col md={5}>
                    <DateTimePicker
                        clearable
                        label="Thời gian kết thúc"
                        value={endDate}
                        withAsterisk
                        placeholder="Thời gian kết thúc"
                        mx="auto"
                        error={errorEndDate}
                        onChange={onChangeEndDate}
                    />
                </Col>
                <Col
                    md={2}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onViewExchangeHistoryClicked}
                    >
                        Xem
                    </Button>
                </Col>
            </Grid>
            <Space h="lg" />
            <DataTableExtensions {...tableData}>
                <DataTable
                    columns={columns}
                    data={data}
                    title={
                        <Center>
                            <Text weight={500}>{title}</Text>
                        </Center>
                    }
                    paginationPerPage={50}
                    sortIcon={<IconArrowBadgeUpFilled />}
                    defaultSortAsc={true}
                    pagination
                    highlightOnHover={true}
                    dense={false}
                />
            </DataTableExtensions>
        </>
    );
};

export default ExchangeHistory;
