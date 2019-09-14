import React, { Component } from 'react';
import { ComponentWrapper } from './gameScreen.style';
import { AppActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { Modal, Button, notification, Layout, Row, Col } from 'antd';
import { RenderMap } from './utility';
import FormActions from './FormActions';

const { Sider, Content } = Layout;

const RandomNumber = () => {
    return Math.floor(Math.random() * 32) - 16;
};

const SingleRow = (rowIndex) => {
    let singleRow = [];
    for (let i = 1 ; i <= 20 ; i ++) {
        const singleCell = {
            owner: 'none',
            score: RandomNumber(),
            key: 20 * (rowIndex -1) + i,
        };
        singleRow.push(singleCell);
    }
    return singleRow;
};

const CreateField = () => {
    let field = [];
    for (let i = 1 ; i <= 20 ; i ++) {
        field.push(SingleRow(i));
    }
    return field;
};


class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playField: CreateField(),
            player: {
            },
            visibleModal: true,
            choosingAgent: null
        }
    }

    componentDidMount() {
    }

    confirmPlayer = (id) => {
        this.setState({
            visibleModal: false
        });

        const { requestStartGame, requestGetMap } = this.props;
        requestStartGame({id});
        requestGetMap({});
    };

    notChoosePlayer = () => {
        notification.warning({
            message: 'Xin hãy chọn người chơi',
            description:
                'Bạn cần chọn người chơi trước khi bắt đầu',
        });
    };

    changeChoosingPLayer = (id) => {
        this.setState({
            choosingAgent: id
        });
    };

    getListAgent = (realMap, idPlayer) => {

        return realMap.teams.filter(team => team.teamID === idPlayer)[0].agents;
    };

    render () {
        const { playField, visibleModal, choosingAgent } = this.state;
        const { AppReducers } = this.props;
        const RenderObj = AppReducers.hasData ? RenderMap({AppReducers}) : null;
        return (
            <ComponentWrapper>

                <h1> Procon 2019 </h1>

                <Modal
                    title={"Chọn người chơi"}
                    visible={visibleModal}
                    footer={null}
                    onCancel={this.notChoosePlayer}
                >
                    <Button block={true} onClick={() => this.confirmPlayer(5)}> Người chơi 1 </Button>
                    <Button block={true} onClick={() => this.confirmPlayer(6)}> Người chơi 2 </Button>
                </Modal>

                <Layout>
                    <Content className={'gameField'}>
                        <table
                            className={'playField'}
                            style={{width: "60%", height: "40%"}}
                        >
                            <tbody>
                            {
                                RenderObj !== null?
                                   RenderObj.map((item,index) => {
                                       return (<tr key={index}>
                                           {
                                               item
                                           }
                                       </tr>)
                                   })
                                    :null
                            }
                            </tbody>
                        </table>
                    </Content>
                    <Sider className={"siderControl"} width={"50%"}>
                        <Row>
                            {
                                AppReducers.hasData ?
                                this.getListAgent(AppReducers.map, AppReducers.id).map(
                                    (agent,index) =>
                                        <Col key={index} span={10} offset={1}>
                                            <FormActions agentID={agent.agentID} position={{x: agent.x, y: agent.y}}/>
                                        </Col>
                                )
                                    : null
                            }
                        </Row>
                    </Sider>
                </Layout>

            </ComponentWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(
    mapStateToProps,
    AppActions
)(GameScreen);
