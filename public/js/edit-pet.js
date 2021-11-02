const delButtonHandler = async (event) => {
    event.preventDefault();
    const pet_id = document.querySelector('#edit-pet-id').value;

    const response = await fetch(`/api/pets/${pet_id}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete pet');
        }
};

const updateButtonHandler = async (event) => {
    event.preventDefault();

    const pet_id = document.querySelector('#edit-pet-id').value;
    const pet_name = document.querySelector('#edited-name').value.trim();
    const pet_type = document.querySelector('#edited-type').value.trim();
    const pet_color = document.querySelector('#edited-color').value.trim();
    const pet_dob = document.querySelector('#edited-DOB').value.trim();


    if (pet_name && pet_type && pet_color && pet_dob) {
        const response = await fetch(`/api/pets/${pet_id}`, {
            method: 'PUT',
            body: JSON.stringify({pet_name, pet_type, pet_color, pet_dob}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update pet');
        }
    }
}

document
    .querySelector('#delete-pet-button')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('#edit-pet')
    .addEventListener('click', updateButtonHandler);