import React, { Component } from 'react';
import { ComponentWrapper } from './gameScreen.style';
import { AppActions } from '../../redux/actions';
import { connect } from 'react-redux';
import {Modal, Button, notification, Layout, Row, Col, Input, Descriptions} from 'antd';
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
            choosingAgent: null,
            mapId: null,
            teamId: null
        }
    }

    componentDidMount() {
    }

    handleStartGame = () => {
        this.setState({
            visibleModal: false
        });
        const {teamId, mapId} = this.state;
        const { requestStartGame, requestGetMapInfo } = this.props;
        requestStartGame({teamId, mapId});
        requestGetMapInfo({mapId});
    };

    handleContinueGame = () => {
        this.setState({
            visibleModal: false
        });

        const {teamId, mapId} = this.state;
        const {requestContinueGame, requestGetMapInfo} = this.props;
        requestContinueGame({teamId, mapId});
        requestGetMapInfo({mapId});
    };

    notChoosePlayer = () => {
        notification.warning({
            message: 'Xin hãy chọn người chơi',
            description:
                'Bạn cần chọn người chơi trước khi bắt đầu',
        });
    };

    handleChangeInput = (e, field) => {
        console.log(e.target.value);
        this.setState({
            [field]: e.target.value
        });
    };

    getListAgent = (realMap, idPlayer) => {
        console.log(realMap);
        console.log(idPlayer);
        return realMap.teams.filter(team => team.teamID === idPlayer)[0].agents;
    };

    getOpponentScore = () => {
        const {AppReducers } = this.props;
        if (AppReducers.map === null) return 0;
        const {AppReducers: {map: {teams}}} = this.props;
        const {teamId} = this.state;

        const opponentTeam = teams.filter(team => team.teamID !== parseInt((teamId)))[0];
        return opponentTeam.tilePoint + opponentTeam.areaPoint;
    };

    getHomeScore = () => {
        const {AppReducers } = this.props;
        if (AppReducers.map === null) return 0;
        const {AppReducers: {map: {teams}}} = this.props;
        const {teamId} = this.state;

        const team = teams.filter(team => team.teamID === parseInt(teamId))[0];
        return team.tilePoint + team.areaPoint;
    };

    render () {
        const { visibleModal , mapId, teamId} = this.state;
        const { AppReducers, requestFixTurn, requestAction} = this.props;
        const RenderObj = AppReducers.hasData ? RenderMap({AppReducers}) : null;
        return (
            <ComponentWrapper>

                <h1> Procon 2019 </h1>

                <Modal
                    visible={AppReducers.map ? AppReducers.map.turn >= AppReducers.maxTurn: false}
                    footer={null}
                >
                    {
                        this.getOpponentScore() === this.getHomeScore()
                            ? <h1 style={{color: '#ffab00'}}> 2 team đã hòa </h1>
                            :
                        this.getHomeScore() > this.getOpponentScore() ?
                            <h1 style={{color: 'green'}}> Bạn đã thắng </h1>
                            : <h1 style={{color: 'red'}}> Bạn đã thua </h1>
                    }

                    <Descriptions>
                        <Descriptions.Item label={"Điểm đối phương"} style={{color: 'red'}}> {this.getOpponentScore()}  </Descriptions.Item>
                        <Descriptions.Item label={"Điểm của bạn"} style={{color: 'green'}}> {this.getHomeScore()} </Descriptions.Item>
                    </Descriptions>

                    <b> Press F5 to play again </b>
                </Modal>

                <Modal
                    title={"Chọn người chơi"}
                    visible={visibleModal}
                    footer={null}
                    onCancel={this.notChoosePlayer}
                >
                    <Input value={mapId}  placeholder={"Choose mapId"} onChange={e => this.handleChangeInput(e, "mapId")}/>
                    <Input value={teamId} placeholder={"Choose team Id"} onChange={e => this.handleChangeInput(e, "teamId")}/>
                    <Button block onClick={this.handleStartGame}> Bắt đầu chơi </Button>
                    <Button type={"primary"} onClick={this.handleContinueGame} block>
                        Chơi tiếp
                    </Button>
                </Modal>

                <Layout>

                    <Content className={'gameField'}>
                        <h1> Số lượt chơi: {AppReducers.map ? AppReducers.map.turn: 0} </h1>

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

                        <Descriptions>
                            <Descriptions.Item label={"Điểm đối phương"} style={{color: 'red'}}> {this.getOpponentScore()}  </Descriptions.Item>
                            <Descriptions.Item label={"Điểm của đội"} style={{color: 'green'}}> {this.getHomeScore()} </Descriptions.Item>
                        </Descriptions>

                    </Content>

                    <Sider className={"siderControl"} width={"50%"}>
                        <Row>
                            {
                                AppReducers.hasData ?
                                this.getListAgent(AppReducers.map, parseInt(AppReducers.id)).map(
                                    (agent,index) =>
                                        <Col key={index} span={10} offset={1}>
                                            <FormActions requestFixTurn={requestFixTurn} agentID={agent.agentID} position={{x: agent.x, y: agent.y}}/>
                                        </Col>
                                )
                                    : null
                            }
                        </Row>
                        <br/>
                        <Button type={"primary"} onClick={requestAction} block loading={AppReducers.isLoading}>
                            Thực hiện nước cờ
                        </Button>

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
