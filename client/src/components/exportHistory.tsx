import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { IconArrowBadgeUpFilled } from '@tabler/icons-react';

import { Button, Center, Col, Grid, Space, Text } from '@mantine/core';

import { DateTimePicker } from '@mantine/dates';

import { HostnameState } from '../features/hostname';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { useEffect, useState } from 'react';

const ExportHistory = () => {
    const hostname = useSelector(HostnameState);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');

    const getExportHistory = () => {
        let url = `${hostname}/GetListExportHistory`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        let totalPriceForListProduct = 0;

                        for (let item of res.data) {
                            if (
                                item.TotalPrice !== null &&
                                item.TotalPrice !== undefined
                            ) {
                                totalPriceForListProduct += item.TotalPrice;
                            } else {
                                totalPriceForListProduct += 0;
                            }
                        }

                        let obj = {
                            StockName: 'Tổng cộng',
                            TotalPrice: totalPriceForListProduct,
                        };

                        // @ts-ignore
                        setData([...res.data, obj]);
                        setStartDate(
                            // @ts-ignore
                            new Date(res.data[res.data.length - 1].ExportDate),
                        );
                        // @ts-ignore
                        setEndDate(new Date(res.data[0].ExportDate));

                        setTitle(
                            `Danh sách các sản phẩm đã xuất từ ngày ${convertDateNotTimeToString(
                                res.data[res.data.length - 1].ExportDate,
                            )} đến ngày ${convertDateNotTimeToString(
                                res.data[0].ExportDate,
                            )}`,
                        );
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    const getExportHistoryByTimeStamp = (start: any, end: any) => {
        let url = `${hostname}/GetListExportHistoryByTimeStamp?start=${start}&end=${end}`;

        axios
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        let totalPriceForListProduct = 0;

                        for (let item of res.data) {
                            if (
                                item.TotalPrice !== null &&
                                item.TotalPrice !== undefined
                            ) {
                                totalPriceForListProduct += item.TotalPrice;
                            } else {
                                totalPriceForListProduct += 0;
                            }
                        }

                        let obj = {
                            StockName: 'Tổng cộng',
                            TotalPrice: totalPriceForListProduct,
                        };

                        // @ts-ignore
                        setData([...res.data, obj]);
                        setStartDate(
                            // @ts-ignore
                            new Date(res.data[res.data.length - 1].ExportDate),
                        );
                        // @ts-ignore
                        setEndDate(new Date(res.data[0].ExportDate));

                        setTitle(
                            `Danh sách các sản phẩm đã xuất từ ngày ${convertDateNotTimeToString(
                                res.data[res.data.length - 1].ExportDate,
                            )} đến ngày ${convertDateNotTimeToString(
                                res.data[0].ExportDate,
                            )}`,
                        );
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getExportHistory();
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
            name: 'Tên kho',
            selector: (row: any) => row.StockName,
            sortable: true,
            cellExport: (row: any) => row.StockName,
        },
        {
            name: 'Tên kệ',
            selector: (row: any) => row.CabinetName,
            sortable: true,
            cellExport: (row: any) => row.CabinetName,
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
            name: 'Ngày xuất',
            selector: (row: any) => row.ExportDate,
            format: (row: any) => convertDateToString(row.ExportDate),
            sortable: true,
            cellExport: (row: any) => row.ExportDate,
        },
        {
            name: 'Số lượng',
            selector: (row: any) => row.Amount,
            sortable: true,
            cellExport: (row: any) => row.Amount,
        },
        {
            name: 'Đơn giá',
            selector: (row: any) => row.Price,
            sortable: true,
            cellExport: (row: any) => row.Price,
        },
        {
            name: 'Thành tiền',
            selector: (row: any) => row.TotalPrice,
            sortable: true,
            cellExport: (row: any) => row.TotalPrice,
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

    const onViewExportHistoryClicked = () => {
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
            let totalMilisecondStart = startDate.getTime();
            let totalMilisecondEnd = endDate.getTime();

            getExportHistoryByTimeStamp(
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
                        onClick={onViewExportHistoryClicked}
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

export default ExportHistory;
