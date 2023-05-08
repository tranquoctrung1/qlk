import { Box, Col, Grid } from '@mantine/core';
import Cabinet from '../components/cabinet';

const District3Stock = () => {
    return (
        <>
            <Grid>
                <Col span={4}>
                    <Cabinet name="Toilet" id="" isCabinet={false} />
                </Col>
                <Col span={4}>
                    <Cabinet name="Bàn thờ" id="" isCabinet={false} />
                </Col>
                <Col span={4}>
                    <Cabinet name="Kệ 7" id="12312312312312" isCabinet={true} />
                </Col>
            </Grid>
            <Grid>
                <Col span={4}>
                    <Cabinet
                        name="Chân - Đầu cúp hư"
                        id="12312312312312"
                        isCabinet={true}
                    />
                </Col>
                <Col span={4}>
                    <Grid>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 6"
                                id="12312312312312"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 5"
                                id="12312312312312"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 4"
                                id="12312312312312"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 3"
                                id="12312312312312"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 2"
                                id="12312312312312"
                                isCabinet={true}
                            />
                        </Col>
                    </Grid>
                </Col>
                <Col span={4}>
                    <Cabinet name="Kệ 8" id="12312312312312" isCabinet={true} />
                </Col>
            </Grid>
            <Grid>
                <Col span={4}>
                    <Cabinet
                        name="Gác lửng"
                        id="12312312312312"
                        isCabinet={true}
                    />
                </Col>
                <Col span={4}>
                    <Cabinet
                        name="Kệ 1"
                        id="645853882e1f4d9bfed69e54"
                        isCabinet={true}
                    />
                </Col>
                <Col
                    span={4}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Cabinet name="Cửa chính" id="" isCabinet={false} />
                    <Cabinet
                        name=" Cúp vàng trơn"
                        id="12312312312312"
                        isCabinet={true}
                    />
                </Col>
            </Grid>
        </>
    );
};

export default District3Stock;
