const editPetHandler = async (event) => {
    event.preventDefault();

    const pet_id = document.querySelector('#edit-pet-id').value;
    const pet_name = document.querySelector('#edited-name').value.trim();
    const pet_type = document.querySelector('#edited-type').value.trim();
    const color = document.querySelector('#edited-color').value.trim();
    const dateofbirth = document.querySelector('#edited-DOB').value.trim();


    if (pet_name && pet_type && color && dateofbirth) {
        const response = await fetch(`/api/pets/${pet_id}`, {
            method: 'PUT',
            body: JSON.stringify({pet_name, pet_type, color, dateofbirth}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.alert('Pet info updated!');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update pet');
        }
    }
}

document
    .querySelector('#edit-pet-button')
    .addEventListener('click', editPetHandler);