async function newFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#pname').value;
    const type = document.querySelector('#pspecies').value;
    const color = document.querySelector('#pcolor').value;
    const dateofbirth = document.querySelector('#pbday').value;
    const response = await fetch(`/api/petRoute`, {
        method: `POST`,
        body: JSON.stringify({
            name,
            type,
            color,
            dateofbirth,
        }),
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
      alert('failed to add pet');
    }
}

document.querySelector('.new-pet').addEventListener('submit', newFormHandler);








