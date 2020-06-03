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
    constructor(name, dob, tel, email){
        this.name = name;
        this.dob = dob;
        this.tel = tel;
        this.email = email;
    }

    save(){
        this.id = Math.random().toString();
        getContactsFromFile(contacts => {
            contacts.push(this);
            fs.writeFile(p, JSON.stringify(contacts), (err) => {
                console.log(err);
           });
        });
    }

    static fetchAll(cb){
        getContactsFromFile(cb);
    }

    static findById(id, cb) {
        getContactsFromFile(contacts => {
            const contact = contacts.find(p => p.id === id);
            cb(contact);
        });
    }

    static updateContact(id, name, dob, tel, email){
        getContactsFromFile(contacts => {
            const existingContactIndex = contacts.findIndex(cont => cont.id === id);
            const existingContact = contacts[existingContactIndex];
            let updatedContact;
            if(existingContact){
                updatedContact = {...existingContact};
                updatedContact.name = name;
                updatedContact.dob = dob;
                updatedContact.tel = tel;
                updatedContact.email = email;
                contacts[existingContactIndex] = updatedContact;
            }
            fs.writeFile(p, JSON.stringify(contacts), (err) => {
                console.log(err);
           });
        });
    }
}