const pet_id = document.querySelector('input[name="pet-id"]').value;

async function newVetFormHandler(event) {
    event.preventDefault();

    const date = document.querySelector('#new-visit-date').value.trim();
    const description = document.querySelector('#new-visit-description').value.trim();
    const weight = document.querySelector('#new-visit-weight').value.trim();

    const response = await fetch(`/api/vet-visits`, {
      method: 'POST',
      body: JSON.stringify({
        pet_id,
        date,
        description,
        weight,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.alert("New vet visit created!");
      document.location.replace(`/api/pets/${pet_id}`);
    } else {
      alert('Failed to add visit');
    }
}
  
document.querySelector('.new-vet-form').addEventListener('submit', newVetFormHandler);