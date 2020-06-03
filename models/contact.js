const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'contacts.json');

const getProductsFromFile = (cb) => {
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
        getProductsFromFile(contacts => {
            contacts.push(this);
            fs.writeFile(p, JSON.stringify(contacts), (err) => {
                console.log(err);
           });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(contacts => {
            const contact = contacts.find(p => p.id === id);
            cb(contact);
        });
    }
}