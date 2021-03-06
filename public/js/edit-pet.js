const delButtonHandler = async (event) => {
    event.preventDefault();
    const pet_id = document.querySelector('#edit-pet-id').value;

    const response = await fetch(`/api/pets/${pet_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            window.alert('Sorry for your loss!');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete pet');
        }
};

document
    .querySelector('#delete-pet-button')
    .addEventListener('click', delButtonHandler);

