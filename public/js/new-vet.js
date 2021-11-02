async function newFormHandler(event) {
    event.preventDefault();
    const date = document.querySelector('#new-visit-date').value;
    const description = document.querySelector('#new-visit-description').value;
    const weight = document.querySelector('#new-visit-weight').value;
    const response = await fetch(`/api/vet-visitRoute`, {
      method: 'POST',
      body: JSON.stringify({
        date,
        description,
        weight,
      }),
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add visit');
    }
}
  
document.querySelector('.new-vet-form').addEventListener('submit', newFormHandler);