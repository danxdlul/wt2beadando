import {EventEmitter} from 'events'

class Store extends EventEmitter{
    currentUser = "";
    orderlist = [];
    emitChange(){
        console.log("emit");
        this.emit('change')
    }
    addChangeListener(callback){
        this.on('change',callback);
    }
    removeChangeListener(callback){
        this.removeListener('change',callback)
    }
}
export default new Store();