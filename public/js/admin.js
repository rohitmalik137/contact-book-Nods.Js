const deleteContact = (btn) => {
    const contactId = btn.parentNode.querySelector('[name=contactId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const contactElement = btn.closest('article');
    console.log(contactElement);

    fetch('/delete-contact/' + contactId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
        contactElement.parentNode.removeChild(contactElement);
    })
    .catch(err => {
        console.log(err);
    })
};