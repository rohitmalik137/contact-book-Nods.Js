var searchField = '';
function searchContact(search) {
    searchField = search.value;
    console.log(searchField);
}
var methods = {
    another: function() {
        console.log(searchField);
    }
}

exports.data = methods;