import React, { Component } from 'react';
import { ComponentWrapper } from './gameScreen.style';
import { AppActions } from '../../redux/actions';
import { connect } from 'react-redux';
import {Modal, Button, notification, Layout, Row, Col, Input, Descriptions, Select} from 'antd';
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
            teamId: null,
            recentToken: null
        }
    }

    componentDidMount() {
    }

    handleGetMap = () => {
        this.setState({
            visibleModal: false
        });
        const { requestGetMap } = this.props;
        requestGetMap();
    };

    notChoosePlayer = () => {
        notification.warning({
            message: 'Xin hãy chọn người chơi',
            description:
                'Bạn cần chọn người chơi trước khi bắt đầu',
        });
    };

    handleChangeInput = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    };

    getListAgent = (realMap, idPlayer) => {
        return realMap.teams.filter(team => team.teamID === idPlayer)[0].agents;
    };

    getOpponentScore = () => {
        const {AppReducers } = this.props;
        if (AppReducers.map === null) return 0;
        const {AppReducers: {map: {teams}}} = this.props;
        const {teamId} = AppReducers;

        const opponentTeam = teams.filter(team => team.teamID !== parseInt(teamId))[0];
        return opponentTeam.tilePoint + opponentTeam.areaPoint;
    };

    getHomeScore = () => {
        const {AppReducers } = this.props;
        if (AppReducers.map === null) return 0;
        const {AppReducers: {map: {teams}}} = this.props;
        const {teamId} = AppReducers;

        const team = teams.filter(team => team.teamID === parseInt(teamId))[0];
        return team.tilePoint + team.areaPoint;
    };

    handleSetToken= () => {
        const {requestSetToken} = this.props;
        const {recentToken} = this.state;
        requestSetToken({token: recentToken});
    };

    handleSetMatchId = (values) => {
        const {requestSetMatchId} = this.props;
        requestSetMatchId({matchId: values});
    };

    render () {
        const { visibleModal , recentToken} = this.state;
        const { AppReducers, requestFixTurn, requestAction} = this.props;
        const {listMatches, matchId} = AppReducers;
        const RenderObj = AppReducers.hasData ? RenderMap({AppReducers}) : null;
        return (
            <ComponentWrapper>

                <h1> Procon 2019 </h1>

                <Modal
                    visible={false}
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
                    <Input placeholder={"Nhập token"} values={recentToken} onChange={(e) => this.setState({recentToken: e.target.value})}/>
                    <Select placeholder={"Chọn trận"} style={{width: '100%'}} value={matchId} onChange={this.handleSetMatchId}>
                        {
                            listMatches.length > 0 ?
                            listMatches.map(match =>
                                <Select.Option
                                    key={match.id}
                                    value={match.id}
                                >
                                    {match.id}
                                </Select.Option>
                            )
                                :null
                        }
                    </Select>

                    <Button block onClick={this.handleSetToken} loading={AppReducers.isLoading}> Check token </Button>

                    <Button type={"primary"} onClick={this.handleGetMap} block>
                        Bắt đầu
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

                        <Button onClick={this.handleGetMap}> Get Map </Button>

                        <Descriptions>
                            <Descriptions.Item label={"Điểm đối phương"} style={{color: 'red'}}> {this.getOpponentScore()}  </Descriptions.Item>
                            <Descriptions.Item label={"Điểm của đội"} style={{color: 'green'}}> {this.getHomeScore()} </Descriptions.Item>
                        </Descriptions>

                    </Content>

                    <Sider className={"siderControl"} width={"50%"}>
                        <Row>
                            {
                                AppReducers.hasData ?
                                this.getListAgent(AppReducers.map, parseInt(AppReducers.teamId)).map(
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
