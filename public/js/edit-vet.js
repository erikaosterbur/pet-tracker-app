const delButtonHandler = async (event) => {
    event.preventDefault();
    const vet_id = document.querySelector('#edit-vet-id').value;

    const response = await fetch(`/api/vet-visits/${vet_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            window.alert('Vet visit deleted');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete vet visit');
        }
};

document
    .querySelector('#delete-vet-button')
    .addEventListener('click', delButtonHandler);

