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
                    <Cabinet
                        name="Kệ 7"
                        id="646369ab9aa654dac9e0ddeb"
                        isCabinet={true}
                    />
                </Col>
            </Grid>
            <Grid>
                <Col span={4}>
                    <Cabinet
                        name="Chân - Đầu cúp hư"
                        id="646369df9aa654dac9e0ddf9"
                        isCabinet={true}
                    />
                </Col>
                <Col span={4}>
                    <Grid>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 6"
                                id="6463699e9aa654dac9e0dde4"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 5"
                                id="6463698d9aa654dac9e0dde0"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 4"
                                id="646369879aa654dac9e0dddb"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 3"
                                id="646369809aa654dac9e0ddd8"
                                isCabinet={true}
                            />
                        </Col>
                        <Col span={12}>
                            <Cabinet
                                name="Kệ 2"
                                id="6461cff09aa654dac9e0a327"
                                isCabinet={true}
                            />
                        </Col>
                    </Grid>
                </Col>
                <Col span={4}>
                    <Cabinet
                        name="Kệ 8"
                        id="646369b09aa654dac9e0ddee"
                        isCabinet={true}
                    />
                </Col>
            </Grid>
            <Grid>
                <Col span={4}>
                    <Cabinet
                        name="Gác lửng"
                        id="646369ed9aa654dac9e0ddfe"
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
                        id="646369cc9aa654dac9e0ddf4"
                        isCabinet={true}
                    />
                </Col>
            </Grid>
        </>
    );
};

export default District3Stock;
