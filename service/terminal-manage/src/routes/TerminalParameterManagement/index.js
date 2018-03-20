import React,{ Component } from 'react'
import { connect } from 'dva';
import { Button, Form, Modal } from 'antd';
import NavBar from '../../components/DefaultUI/NavBar';
import TableUI from '../../components/DefaultUI/TableUI'
import EditableCell from '../../components/DefaultUI/EditableCell'
import { withRouter,routerRedux } from 'dva/router'

const confirm = Modal.confirm;
const messages = window.appLocale.messages;
let editState = [];

class TerminalParameterManagement extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    editState = [];
  }

  routerWillLeave=(nextLocation)=>{
    const { dispatch } = this.props;
    let flag = true;
    editState.map(item=>{
      if(item){
        flag = false;
      }}
    );
    if(!flag){
      confirm({
        content: messages.redirectConfirm,
        onOk() {
          editState = [];
          dispatch(routerRedux.push({pathname: nextLocation.pathname}));
        },
        onCancel() {},
      });
    }
    return flag;
  };

  handleEditState = (index,value) => {
    editState[index] = value;
  };

  render(){
    const { dispatch, terminal_parameter_management, loading } = this.props;
    const edit = (code,value) => {
      dispatch({type:'terminal_parameter_management/editParamenter',payload:{code,value}});
    };

    const columns = [
      {
        title: messages['parameterName'],
        dataIndex: 'name',
        key: 'name',
        width:'25%'
      },
      {
        title: messages['parameterValue'],
        dataIndex: 'value',
        key: 'value',
        width:'25%',
        render:(text, record, index ) => {
          return (
            <EditableCell key={index} code={record.code} value={record.value} id={record.id} handleEditState={this.handleEditState} onChange={edit}/>
          )
        }
      },
    ];
    const rowKey = record => record.id;
    const tableProps = { columns,rowKey, data:terminal_parameter_management.data,loading };
    return (
      <div>
        <NavBar title={messages["common.home.sider.menu.terminal_parameter_management"]} />
        <div style={{width:'50%',marginTop:30}}>
          <TableUI {...tableProps} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    terminal_parameter_management:state.terminal_parameter_management,
    loading: state.loading.models.terminal_parameter_management
  };
}

export default withRouter(connect(mapStateToProps)(Form.create()(TerminalParameterManagement)));

