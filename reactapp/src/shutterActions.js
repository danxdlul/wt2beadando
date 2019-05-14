import Constants from './constants/Constants';
import shutterDispatcher from './shutterDispatcher';

class ShutterActions{
    listAllOrders(){
        shutterDispatcher.handleViewAction({
            actionType: Constants.GET_ORDERS,
            payload: null
        });
    }
    changeUser(newUser){
        shutterDispatcher.handleViewAction({
            actionType: Constants.USER_CHANGED,
            payload: {userName: newUser}
        });
    }
    getUsersOrders(customerid){
        console.log(customerid);
        shutterDispatcher.handleViewAction({
            actionType: Constants.GET_USERS_ORDERS,
            payload: {customerid : customerid}
        });
    }
    finishJob(order,index){
        shutterDispatcher.handleViewAction({
            actionType: Constants.FINISH_JOB,
            payload: {order:order,index:index}
        });
    }
    createOrder(order){
        shutterDispatcher.handleViewAction({
            actionType: Constants.CREATE_ORDER,
            payload: {data: order}
        });
    }
    modifyDate(order,date){
        shutterDispatcher.handleViewAction({
            actionType: Constants.MODIFY_DATE,
            payload: {id:order, date:date}
        })
    }
    payOrder(order){
        shutterDispatcher.handleViewAction({
            actionType: Constants.PAY_ORDER,
            payload: {id:order}
        })
    };
}
export default new ShutterActions();