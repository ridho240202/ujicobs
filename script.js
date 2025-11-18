// Navigasi halaman
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.style.display='none');
  document.getElementById(id).style.display='block';
}

// Data PO
let poData = JSON.parse(localStorage.getItem('poData') || '[]');
let itemData = JSON.parse(localStorage.getItem('itemData') || '[]');

// Render PO List
function renderPO() {
  const tbody = document.querySelector('#poTable tbody');
  tbody.innerHTML = '';
  poData.forEach((po, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${po.perusahaan}</td>
      <td>${po.alamat}</td>
      <td>${po.fax}</td>
      <td>${po.melalui}</td>
      <td>${po.kontak}</td>
      <td>
        <button onclick="editPO(${idx})">Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Buat PO Baru
function createNewPO() {
  localStorage.setItem('currentPO', JSON.stringify({}));
  localStorage.removeItem('currentPOItems');
  window.location.href = 'po-form.html';
}

// Edit PO
function editPO(idx) {
  localStorage.setItem('currentPO', JSON.stringify(poData[idx]));
  localStorage.setItem('editIndex', idx);
  localStorage.setItem('currentPOItems', JSON.stringify(poData[idx].items || []));
  window.location.href = 'po-form.html';
}

// Render Item List
function renderItem() {
  const tbody = document.querySelector('#itemTable tbody');
  tbody.innerHTML = '';
  itemData.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item}</td>
      <td><button onclick="deleteItem(${idx})">Hapus</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addItem() {
  const val = document.getElementById('newItem').value.trim();
  if(!val) return alert('Isi nama alat');
  itemData.push(val);
  localStorage.setItem('itemData', JSON.stringify(itemData));
  document.getElementById('newItem').value = '';
  renderItem();
}

function deleteItem(idx) {
  itemData.splice(idx,1);
  localStorage.setItem('itemData', JSON.stringify(itemData));
  renderItem();
}

renderPO();
renderItem();
