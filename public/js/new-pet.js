const newPetFormHandler = async (event) => {
    event.preventDefault();

    const pet_name = document.querySelector('#pname').value.trim();
    const pet_type = document.querySelector('#pspecies').value.trim();
    const color = document.querySelector('#pcolor').value.trim();
    const dateofbirth = document.querySelector('#pbday').value.trim();

    const response = await fetch(`/api/pets`, {
        method: `POST`,
        body: JSON.stringify({
            pet_name,
            pet_type,
            color,
            dateofbirth, 
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
      alert('failed to add pet');
    }
}

document.querySelector('#new-pet-form').addEventListener('submit', newPetFormHandler);








