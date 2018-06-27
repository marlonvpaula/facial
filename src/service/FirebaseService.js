import {firebaseDatabase} from '../utils/firebaseUtils'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath)
                                   .limitToLast(size);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };
    static getUniqueDataBy = (node, id, callback) => {

        let query = firebaseDatabase.ref(node + '/' + id);
        query.on('value', dataSnapshot => {
            let item = {};
            item = dataSnapshot.val();
            item['key'] = dataSnapshot.key;
            callback(item);
        });
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static updateData = (id, node, objToSubmit) => {
        firebaseDatabase.ref(node + '/' + id).set(objToSubmit);
        return id;
    };

    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

}