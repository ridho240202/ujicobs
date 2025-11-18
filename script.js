let itemsData = [];

// Ambil data dari JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    itemsData = data.items;
    renderItems();
  });

// Render tabel item PO
function renderItems() {
  const tbody = document.querySelector("#items-table tbody");
  tbody.innerHTML = "";
  itemsData.forEach((item, index) => {
    const tr = document.createElement("tr");
    const total = item.qty * item.harga;

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.no_seri}</td>
      <td>${item.qty}</td>
      <td>${item.total_jam}</td>
      <td>${item.harga}</td>
      <td>${total}</td>
      <td><button onclick="hapusItem(${index})">Hapus</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Tambah item baru
document.getElementById("add-item-btn").addEventListener("click", () => {
  const newItem = {
    name: "Item Baru",
    no_seri: "",
    qty: 0,
    total_jam: 0,
    harga: 0
  };
  itemsData.push(newItem);
  renderItems();
});

// Hapus item
function hapusItem(index) {
  itemsData.splice(index, 1);
  renderItems();
}

// Download Excel
document.getElementById("download-btn").addEventListener("click", () => {
  const perusahaan = document.getElementById("perusahaan").value;
  const alamat = document.getElementById("alamat").value;
  const fax = document.getElementById("fax").value;
  const melalui = document.getElementById("melalui").value;
  const kontak = document.getElementById("kontak").value;

  const wsData = [
    ["Informasi Perusahaan / Customer"],
    ["Perusahaan", perusahaan],
    ["Alamat", alamat],
    ["Fax", fax],
    ["Melalui", melalui],
    ["Kontak Person", kontak],
    [],
    ["Item PO (Alat yang Dikalibrasi)"],
    ["Nama Alat", "No Seri", "Qty", "Total Jam", "Harga", "Total"]
  ];

  itemsData.forEach(item => {
    wsData.push([
      item.name,
      item.no_seri,
      item.qty,
      item.total_jam,
      item.harga,
      item.qty * item.harga
    ]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "PO");
  XLSX.writeFile(wb, "PurchaseOrder.xlsx");
});
