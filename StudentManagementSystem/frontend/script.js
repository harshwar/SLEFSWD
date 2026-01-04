const URL = 'http://localhost:3000/api';
const $ = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('#student-table tbody');
    let delId = null;

    const load = async () => {
        const res = await fetch(`${URL}/read`);
        const data = await res.json();
        list.innerHTML = data.map(s => `
            <tr>
                <td>${s.roll_no}</td><td>${s.name}</td><td>${s.department}</td><td>${s.email}</td>
                <td>
                    <button onclick="edit('${s._id}','${s.name}','${s.department}','${s.email}','${s.roll_no}')">Edit</button>
                    <button onclick="askDel('${s._id}')">Del</button>
                </td>
            </tr>`).join('');
    };

    $('add-student-form').onsubmit = async (e) => {
        e.preventDefault();
        await fetch(`${URL}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: $('name').value, roll_no: $('roll_no').value,
                department: $('department').value, email: $('email').value
            })
        });
        $('add-student-form').reset();
        load();
    };

    window.askDel = id => { delId = id; $('deleteModal').classList.remove('hidden'); };
    $('confirmDelete').onclick = async () => {
        await fetch(`${URL}/delete?id=${delId}`, { method: 'DELETE' });
        $('deleteModal').classList.add('hidden');
        load();
    };
    $('cancelDelete').onclick = () => $('deleteModal').classList.add('hidden');

    window.edit = (id, n, d, e, r) => {
        $('edit-roll-no').value = r; $('edit-name').value = n;
        $('edit-department').value = d; $('edit-email').value = e;
        $('editForm').dataset.id = id;
        $('editModal').classList.remove('hidden');
    };

    $('editForm').onsubmit = async (e) => {
        e.preventDefault();
        await fetch(`${URL}/update?id=${$('editForm').dataset.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: $('edit-name').value, department: $('edit-department').value, email: $('edit-email').value
            })
        });
        $('editModal').classList.add('hidden');
        load();
    };

    document.querySelector('.close-btn').onclick = () => $('editModal').classList.add('hidden');
    load();
});
