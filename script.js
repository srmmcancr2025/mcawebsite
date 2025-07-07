// DOM Elements
const sidebarLinks = document.querySelectorAll('.sidebar li');
const contentSections = document.querySelectorAll('.content-section');

// Sample data for different sections
const sampleData = {
    notes: [
        
    ],
    timetable: [
        
    ],
    exams: [

    ],
    alerts: [
        { title: 'Mid-term Examination Schedule', date: '2025-07-28', priority: 'high' },
        { title: 'Project Submission Deadline', date: '2025-10-21', priority: 'medium' },
        { title: 'Holiday Notice', date: '2025-11-30', priority: 'low' }
    ]
};

// Function to switch active content
function switchContent(pageId) {
    // Update sidebar active state
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    // Update content sections
    contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === pageId) {
            section.classList.add('active');
            loadSectionContent(pageId);
        }
    });
}

// Function to load section content
function loadSectionContent(pageId) {
    const container = document.querySelector(`#${pageId} .${pageId}-container`);
    if (!container) return;

    let content = '';
    switch (pageId) {
        case 'notes':
            content = generateNotesContent();
            break;
        case 'timetable':
            content = generateTimetableContent();
            break;
        case 'exams':
            content = generateExamsContent();
            break;
        case 'alerts':
            content = generateAlertsContent();
            break;
    }
    container.innerHTML = content;
}

// Content generation functions
function generateNotesContent() {
    return `
        <div class="no
        tes-list">
            ${sampleData.notes.map(note => `
                <div class="note-item">
                    <h3>${note.title}</h3>
                    <p>Subject: ${note.subject}</p>
                    <p>Date: ${note.date}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function generateTimetableContent() {
    return `
        <div class="timetable-list">
            ${sampleData.timetable.map(slot => `
                <div class="timetable-item">
                    <h3>${slot.day}</h3>
                    <p>${slot.time}</p>
                    <p>${slot.subject}</p>
                    <p>${slot.room}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function generateExamsContent() {
    return `
        <div class="exams-list">
            ${sampleData.exams.map(exam => `
                <div class="exam-item">
                    <h3>${exam.subject}</h3>
                    <p>Date: ${exam.date}</p>
                    <p>Time: ${exam.time}</p>
                    <p>Room: ${exam.room}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function generateAlertsContent() {
    return `
        <div class="alerts-list">
            ${sampleData.alerts.map(alert => `
                <div class="alert-item ${alert.priority}">
                    <h3>${alert.title}</h3>
                    <p>Date: ${alert.date}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Event Listeners
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        const pageId = link.dataset.page;
        switchContent(pageId);
    });
});

// Initialize with dashboard
document.addEventListener('DOMContentLoaded', () => {
    switchContent('dashboard');
});

// Notification dropdown
const notificationIcon = document.getElementById('notificationIcon');
const notificationsDropdown = document.getElementById('notificationsDropdown');
notificationIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
});

// Profile dropdown
const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');
profileIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide dropdowns when clicking outside
document.addEventListener('click', () => {
    notificationsDropdown.style.display = 'none';
    profileDropdown.style.display = 'none';
});

// Logout confirmation
const logoutIcon = document.getElementById('logoutIcon');
const logoutLink = document.getElementById('logoutLink');
function confirmLogout() {
    if (confirm('Are you sure you are forwarding to admission?')) {
        // Redirect to login or perform logout logic
        window.location.href = 'https://www.srmist.edu.in/admission-india/';
    }
}
logoutIcon.addEventListener('click', confirmLogout);
if (logoutLink) logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    confirmLogout();
});