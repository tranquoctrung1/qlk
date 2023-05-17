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
                                id="64636a749aa654dac9e0de42"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 1"
                                id="64636a539aa654dac9e0de32"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 2"
                                id="64636a5d9aa654dac9e0de39"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 3"
                                id="64636a689aa654dac9e0de3c"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={3}>
                            <Cabinet
                                name="Kệ 4"
                                id="64636a6d9aa654dac9e0de3f"
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
