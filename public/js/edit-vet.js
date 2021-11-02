const delButtonHandler = async (event) => {
    event.preventDefault();
    const vet_id = document.querySelector('#edit-vet-id').value;

    const response = await fetch(`/api/posts/${vet_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete vet visit');
        }
};

const updateButtonHandler = async (event) => {
    event.preventDefault();

    const vet_id = document.querySelector('#edit-vet-id').value;
    const vet_date = document.querySelector('#edited-cate').value.trim();
    const vet_description = document.querySelector('#edited-description').value.trim();
    const vet_weight = document.querySelector('#edited-weight').value.trim();


    if (vet_date && vet_description && vet_weight) {
        const response = await fetch(`/api/vet-visits/${vet_id}`, {
            method: 'PUT',
            body: JSON.stringify({vet_date, vet_description, vet_weight}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update vet visit');
        }
    }
}

document
    .querySelector('#delete-vet-button')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('#edit-vet')
    .addEventListener('click', updateButtonHandler);