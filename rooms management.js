/* rooms.js */
document.addEventListener('DOMContentLoaded', function() {
    const addRoomButton = document.getElementById('add-room-button');
    const addRoomModal = document.getElementById('add-room-modal');
    const editRoomModal = document.getElementById('edit-room-modal');
    const closeButtons = document.querySelectorAll('.close');
    const roomsList = document.getElementById('rooms-list');
    const addRoomForm = document.getElementById('add-room-form');
    const editRoomForm = document.getElementById('edit-room-form');

    // Example room data (replace with your backend API calls)
    let rooms = [
        { id: 1, roomNumber: '101', roomType: 'standard', availability: 'available', price: 150 },
        { id: 2, roomNumber: '102', roomType: 'deluxe', availability: 'unavailable', price: 250 },
        { id: 3, roomNumber: '201', roomType: 'family', availability: 'available', price: 350 },
    ];

    function renderRooms() {
        roomsList.innerHTML = '';
        rooms.forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="math-inline">\{room\.roomNumber\}</td\>
<td\></span>{room.roomType}</td>
                <td><span class="math-inline">\{room\.availability\}</td\>
<td\></span>{room.price}</td>
                <td>
                    <button class="edit-room" data-id="<span class="math-inline">\{room\.id\}"\>Edit</button\>
<button class\="delete\-room" data\-id\="</span>{room.id}">Delete</button>
                </td>
            `;
            roomsList.appendChild(row);
        });

        // Add event