/* reports.js */
document.addEventListener('DOMContentLoaded', function() {
    const reportTypeSelect = document.getElementById('reportType');
    const generateReportButton = document.getElementById('generateReport');
    const reportOutput = document.getElementById('report-output');
    const reportModal = document.getElementById('report-modal');
    const modalReportContent = document.getElementById('modal-report-content');
    const closeButton = document.querySelector('.close');

    generateReportButton.addEventListener('click', function() {
        const reportType = reportTypeSelect.value;
        generateAndDisplayReport(reportType);
    });

    closeButton.addEventListener('click', function() {
        reportModal.style.display = 'none';
    });

    function generateAndDisplayReport(reportType) {
        // Example report data (replace with your backend API calls)
        let reportData = [];

        if (reportType === 'dailyBookings') {
            reportData = [
                { bookingId: 1, customerName: 'John Doe', roomNumber: '101', checkinDate: '2024-12-25' },
                { bookingId: 2, customerName: 'Jane Smith', roomNumber: '202', checkinDate: '2024-12-25' },
            ];
            displayTableReport(reportData, ['Booking ID', 'Customer Name', 'Room Number', 'Check-in Date']);
        } else if (reportType === 'monthlyRevenue') {
            reportData = [
                { month: 'December 2024', revenue: 15000 },
                { month: 'January 2025', revenue: 18000 },
            ];
            displayTableReport(reportData, ['Month', 'Revenue (USD)']);
        } else if (reportType === 'roomAvailability') {
            reportData = [
                { roomNumber: '101', roomType: 'Standard', availability: 'Available' },
                { roomNumber: '102', roomType: 'Deluxe', availability: 'Unavailable' },
            ];
            displayTableReport(reportData, ['Room Number', 'Room Type', 'Availability']);
        } else if (reportType === 'customerList') {
            reportData = [
                { customerName: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
                { customerName: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
            ];
            displayTableReport(reportData, ['Customer Name', 'Email', 'Phone']);
        }

        reportModal.style.display = 'block';
    }

    function displayTableReport(data, headers) {
        let tableHTML = '<table><thead><tr>';
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';

        data.forEach(row => {
            tableHTML += '<tr>';
            Object.values(row).forEach(value => {
                tableHTML += `<td>${value}</td>`;
            });
            tableHTML += '</tr>';
        });

        tableHTML += '</tbody></table>';
        modalReportContent.innerHTML = tableHTML;
    }
});