const updateButtonHandler = async (event) => {
    event.preventDefault();

    const vet_id = document.querySelector('#edit-vet-id').value;
    const date = document.querySelector('#edited-date').value.trim();
    const description = document.querySelector('#edited-description').value.trim();
    const weight = document.querySelector('#edited-weight').value.trim();


    if (date && description && weight) {
        const response = await fetch(`/api/vet-visits/${vet_id}`, {
            method: 'PUT',
            body: JSON.stringify({date, description, weight}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.alert('Vet visit updated!');
            document.location.replace(`/api/vet-visits/${vet_id}`);
        } else {
            alert('Failed to update vet visit');
        }
    }
}

document
.querySelector('#edit-vet')
.addEventListener('click', updateButtonHandler);