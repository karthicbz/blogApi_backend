const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    username:{type:String, required:true, maxLength:100},
    password:{type:String, required:true, maxLength:100},
    firstName:{type:String, required: true, maxLength: 100},
    lastName: {type:String, required:true, maxLength: 100}
});

OwnerSchema.virtual('fullName').get(function(){
    let name = '';
    if(this.firstName && this.lastName){
        name = `${this.lastname}, ${this.firstName}`;
    }
    return name;
})

module.exports = mongoose.model("Owner", OwnerSchema);