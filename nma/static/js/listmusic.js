let currentPage = 1;
const totalPages = 5;

function viewPerson(name, id) {
    console.log('Viewing person:', name, 'with ID:', id);
    window.location.href = `artistprofile.html?id=${encodeURIComponent(id)}`;
}



        function updatePagination() {
            document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                // Add logic to update table data here
            }
        }

        function nextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                // Add logic to update table data here
            }
        }

        function sortTable(columnIndex) {
            const table = document.getElementById('dataTable');
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const sortedRows = rows.sort((a, b) => {
                const aText = a.cells[columnIndex].textContent.trim();
                const bText = b.cells[columnIndex].textContent.trim();
                return aText.localeCompare(bText);
            });
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            sortedRows.forEach(row => tbody.appendChild(row));
        }

        function search() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#dataTable tbody tr');
            rows.forEach(row => {
                const name = row.cells[0].textContent.toLowerCase();
                row.style.display = name.includes(query) ? '' : 'none';
            });
        }

        const rows = [
            { name: 'John Doe', id: 'john_doe_id' },
            { name: 'Jane Smith', id: 'jane_smith_id' }
        ];
        
        const tableBody = document.querySelector('#dataTable tbody');
        
        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>
                    <a href="#" onclick="viewPerson('${row.name}', '${row.id}'); return false;" class="view">View</a> |
                    <a href="edit.html?name=${encodeURIComponent(row.name)}" class="edit">Edit</a>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        

        // Initial call to set up the pagination display
        updatePagination();
