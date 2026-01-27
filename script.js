function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('.');
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}`);
}

function renderTable(sessions) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // vyčistit před generováním

  sessions.forEach(session => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${session.day}</td>
      <td>${session.date}</td>
      <td>${session.time}</td>
      <td>${session.courtA ?? ''}</td>
      <td>${session.courtB ?? ''}</td>
    `;
    tableBody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable(squashSessions);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tableBody = document.getElementById('table-body');
  const oldRows = Array.from(tableBody.querySelectorAll('tr')).filter(row => {
    const dateText = row.cells[1].textContent.trim();
    const rowDate = parseDate(dateText);
    if (rowDate && rowDate < today) {
      row.classList.add('hidden');
      return true;
    }
    return false;
  });

  const toggleButton = document.getElementById('toggle-button');
  let showingOld = false;
  toggleButton.addEventListener('click', () => {
    showingOld = !showingOld;
    oldRows.forEach(row => row.classList.toggle('hidden', !showingOld));
    toggleButton.textContent = showingOld ? 'Skrýt uplynulé' : 'Zobrazit uplynulé';
  });
});
