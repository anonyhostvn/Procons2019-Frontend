import React, {Component} from 'react';
import {Form, Select, Radio, Col, Icon, Button} from 'antd';
import { StyledRow } from './formActions.style';
import { movingConstant, convertRequest } from './config';

class FormActions extends Component {
   constructor(props) {
       super(props);
       this.state = {
           type: null,
           direction: null,
           disableForm: false
       }
   }

   handleSelectChange = (value) => {
       this.setState({
           type: value
       })
   };

   handleSelectDirectionChange= (e) => {
       this.setState({
           direction: e.target.value
       });
   };

   handleSubmit = () => {
        const { form: {validateFieldsAndScroll}, agentID, requestFixTurn} = this.props;
        validateFieldsAndScroll((errors, value) => {
            if (!errors) {
                this.setState({
                    disableForm: true
                });
                console.log(convertRequest({...value,agentID}));
                requestFixTurn({
                    newAction: convertRequest({...value,agentID})
                });
            } else {
                console.log('Submit form failed');
            }
        });
   };

   handleCancel = () => {
        this.setState({
            disableForm: false
        })
   };

    render(){
        const { form: {getFieldDecorator}, agentID, position } = this.props;
        const { type, disableForm } = this.state;

        return(
            <div className={"formField"}>
                <h1> Agent: {agentID} ({position.y},{position.x}) </h1>
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('type' , {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please'
                                    }
                                ]
                            })(
                                <Select placeholder={"Chọn loại nước đi"} onSelect={this.handleSelectChange} disabled={disableForm}>
                                    <Select.Option key={movingConstant.move}>
                                        Di chuyển
                                    </Select.Option>
                                    <Select.Option key={movingConstant.remove}>
                                        Xóa ô
                                    </Select.Option>
                                    <Select.Option key={movingConstant.stay}>
                                        Đứng yên
                                    </Select.Option>
                                </Select>
                                )
                        }
                    </Form.Item>

                    {
                        type === movingConstant.move || type === movingConstant.remove
                        ?
                            <div>
                                <Form.Item>
                                    {
                                        getFieldDecorator('direction', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please'
                                                }
                                            ]
                                        })(
                                            <Radio.Group onChange={this.handleSelectDirectionChange} disabled={disableForm}>
                                                <StyledRow>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.LeftUp.name}>
                                                            <Icon type="arrow-right" rotate={225}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.Up.name}>
                                                            <Icon type="arrow-right" rotate={-90}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.RightUp.name}>
                                                            <Icon type="arrow-right" rotate={-45}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.Left.name}>
                                                            <Icon type="arrow-right" rotate={180}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8} style={{textAlign: 'center'}}>
                                                        <Icon type="compass"
                                                              style={{
                                                                        fontSize: '20px',
                                                                        color: type === movingConstant.move? '#00b0ff' : '#d50000'
                                                                    }}
                                                              spin={true}
                                                        />
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.Right.name}>
                                                            <Icon type="arrow-right"/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.LeftDown.name}>
                                                            <Icon type="arrow-right" rotate={135}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.Down.name}>
                                                            <Icon type="arrow-right" rotate={90}/>
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value={movingConstant.RightDown.name}>
                                                            <Icon type="arrow-right" rotate={45}/>
                                                        </Radio.Button>
                                                    </Col>
                                                </StyledRow>
                                            </Radio.Group>
                                        )
                                    }
                                </Form.Item>
                            </div>
                            :null
                    }

                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        <Button onClick={this.handleSubmit} >
                            Quyết định bước đi
                        </Button>
                        <div style={{width: "10px"}}> </div>
                        <Button type={'danger'} onClick={this.handleCancel}>
                            Bỏ quyết định bước đi
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const WrappedForm = Form.create({name: "actions"})(FormActions);

export default WrappedForm;