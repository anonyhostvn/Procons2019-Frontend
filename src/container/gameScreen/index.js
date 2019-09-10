import React, { Component } from 'react';
import { ComponentWrapper } from './gameScreen.style';
import { AppActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { Modal, Button, notification } from 'antd';
import { RenderMap } from './utility';

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
            visibleModal: true
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

    render () {
        const { playField, visibleModal } = this.state;
        const { AppReducers } = this.props;
        const RenderObj = RenderMap({AppReducers});
        return (
            <ComponentWrapper>

                <Modal
                    title={"Chọn người chơi"}
                    visible={visibleModal}
                    footer={null}
                    onCancel={this.notChoosePlayer}
                >
                    <Button block={true} onClick={() => this.confirmPlayer(5)}> Người chơi 1 </Button>
                    <Button block={true} onClick={() => this.confirmPlayer(6)}> Người chơi 2 </Button>
                </Modal>

                <h1> Procon 2019 </h1>

                <div className={'gameField'}>
                    <table
                        className={'playField'}
                        style={{width: "60%", height: "40%"}}
                    >
                        <tbody>
                        {
                           RenderObj.map((item,index) => {
                               return (<tr key={index}>
                                   {
                                       item
                                   }
                               </tr>)
                           })
                        }
                        </tbody>
                    </table>

                    <div>

                    </div>
                </div>
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
