const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'contacts.json');

const getContactsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Contact {
    constructor(name, dob, tel, email, id){
        this.name = name;
        this.dob = dob;
        this.tel = tel;
        this.email = email;
        this._id = id ? new mongoDb.ObjectId(id) : null;
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db
                .collection('contact-list')
                .updateOne({_id: this._id}, {$set: this});
        }else{
            dbOp = db
                .collection('contact-list')
                .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(contactId){
        const db = getDb();
        return db
            .collection('contact-list')
            .deleteOne({_id: new mongoDb.ObjectId(contactId)})
            .then(result => {
                console.log('Deleted!!');
            })
            .catch(err => console.log(err));
    }

    static fetchAll(){
        // getContactsFromFile(cb);
        const db = getDb();
        return db
            .collection('contact-list')
            .find()
            .toArray()
            .then(contacts => {
                console.log(contacts);
                return contacts;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(id) {
        const db = getDb();
        return db
            .collection('contact-list')
            .find({_id : new mongoDb.ObjectId(id) })
            .next()
            .then(contact => {
                console.log(contact);
                return contact;
            })
            .catch(err => {
                console.log(err);
            });
    }
}
