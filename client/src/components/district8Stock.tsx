import { Box, Col, Grid } from '@mantine/core';
import Cabinet from '../components/cabinet';

const District8Stock = () => {
    return (
        <>
            <Grid style={{ height: '50vh' }}>
                <Col
                    span={2}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <div style={{ width: '100%' }}>
                        <Cabinet name="Cửa" id="" isCabinet={false} />
                    </div>
                </Col>
                <Col span={8}>
                    <Grid style={{ height: '100%' }}>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 5"
                                id="1231231231231"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 1"
                                id="1231231231231"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 2"
                                id="1231231231231"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 3"
                                id="1231231231231"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 4"
                                id="1231231231231"
                                isCabinet={true}
                            />
                        </Col>
                    </Grid>
                </Col>
                <Col span={2}>
                    <Cabinet name="Phòng hộp đỏ" id="" isCabinet={false} />
                </Col>
            </Grid>
        </>
    );
};

export default District8Stock;
