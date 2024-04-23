const dataEntryForm = document.getElementById('data-entry-form');
const successMessage = document.getElementById('success-message');
const itemList = document.getElementById('item-list');

dataEntryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const newItem = document.createElement('li');
    newItem.textContent = `Name: ${name}, Description: ${description}`;
    itemList.appendChild(newItem);

    dataEntryForm.reset();
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);
});
