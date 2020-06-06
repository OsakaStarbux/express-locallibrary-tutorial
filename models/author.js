const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
})

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get( function () {
// To avoid errors when an author has no family name or no first name
// We handle the exception by returning an empty string for that case
  console.log("FN: " + this.first_name, "LN: " + this.family_name)
    let fullname = 'default thing';
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name
    }
    if (!this.first_name || !this.family_name) {
        fullname = 'some other thing';
    }

    return fullname;
    })

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function () {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
    return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
