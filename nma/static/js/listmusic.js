let currentPage = 1;
        const totalPages = 5;

        function viewPerson(name) {
            // Example: Open a new page or modal for viewing details
            alert('Viewing details for ' + name);
            // You could redirect to another page like:
            // window.location.href = '/view?name=' + encodeURIComponent(name);
        }

        function editPerson(name) {
            // Example: Open a new page or modal for editing details
            alert('Editing ' + name);
            // You could redirect to another page like:
            // window.location.href = '/edit?name=' + encodeURIComponent(name);
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

        // Initial call to set up the pagination display
        updatePagination();