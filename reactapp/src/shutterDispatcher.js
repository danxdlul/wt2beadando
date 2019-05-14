import {Dispatcher} from 'flux';
import Constants from './constants/Constants';
import Store from './Store/Store';
import shutterActions from './shutterActions';
import axios from 'axios';

class shutterDispatcher extends Dispatcher{
    handleViewAction(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            payload:action
        });
    }


}
const dispatcher = new shutterDispatcher();
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.USER_CHANGED){
        return;
    }
    Store.currentUser = data.payload.payload.userName;
    shutterActions.getUsersOrders(data.payload.payload.userName);

});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.CREATE_ORDER){
        return;
    }
    axios.post('/createOrder',data.payload.payload.data).then(res=>{alert("Thank you for your purchase");}).catch(e=>{alert(e)});
});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.FINISH_JOB){
        return;
    }
    console.log(data.payload.payload.order);
    axios.post(`/JobStatusComplete/${data.payload.payload.order}/${data.payload.payload.index}`).then(res=>{shutterActions.listAllOrders();Store.emitChange();}).catch(e=>{alert(e)})

});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.MODIFY_DATE){
        return;
    }
    fetch('/modifyDate',{
        method: 'POST',
        headers: {
            "Content-Type" : 'application/json'
        },
        body:JSON.stringify(data.payload.payload)
    }).then(res => {alert("Date Registered"); shutterActions.listAllOrders(); Store.emitChange();}).catch(e => {alert(e)});

});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.GET_ORDERS){
        return;
    }
    fetch('/listAllOrders',{
        headers: {
            "Content-Type" : 'application/json',
            "Accept" : "application/json"
        }
    }).then(response => {return response.json()}).then(result =>{console.log(result);Store.orderlist = result; Store.emitChange();});

});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.GET_USERS_ORDERS){
        return;
    }
    fetch(`/listOrders/${data.payload.payload.customerid}`,{
        headers: {
            "Content-Type" : 'application/json',
            "Accept" : "application/json"
        }

    }).then(response =>{return response.json()}).then(result => {Store.orderlist = result; Store.emitChange();});

});
dispatcher.register((data)=>{
    if(data.payload.actionType !== Constants.PAY_ORDER){
        return;
    }
    console.log(data.payload.payload);
    axios.post(`/payOrder/${data.payload.payload.id}`).then(res=>{shutterActions.listAllOrders();Store.emitChange();}).catch(e=>{alert(e)});

});
export default dispatcher;