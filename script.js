// Array of gradient colors for the background
const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let currentGradientIndex = 0;

// DOM elements
const changeColorBtn = document.getElementById('changeColorBtn');
const showTimeBtn = document.getElementById('showTimeBtn');
const updateTextBtn = document.getElementById('updateTextBtn');
const textInput = document.getElementById('textInput');
const timeDisplay = document.getElementById('timeDisplay');
const body = document.body;
const title = document.querySelector('.title');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome animation
    setTimeout(() => {
        title.style.animation = 'pulse 2s ease-in-out infinite alternate';
    }, 1000);
    
    // Add event listeners
    changeColorBtn.addEventListener('click', changeBackgroundColor);
    showTimeBtn.addEventListener('click', toggleTimeDisplay);
    updateTextBtn.addEventListener('click', updateTitleText);
    
    // Add Enter key support for text input
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            updateTitleText();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'c' || e.key === 'C') {
            changeBackgroundColor();
        } else if (e.key === 't' || e.key === 'T') {
            toggleTimeDisplay();
        } else if (e.key === 'u' || e.key === 'U') {
            textInput.focus();
        }
    });
});

// Change background color function
function changeBackgroundColor() {
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
    body.style.background = gradients[currentGradientIndex];
    
    // Add a little animation feedback
    changeColorBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        changeColorBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Show a brief message
    showTemporaryMessage('🎨 Color changed!');
}

// Update title text function
function updateTitleText() {
    const newText = textInput.value.trim();
    
    if (newText === '') {
        showTemporaryMessage('⚠️ Please enter some text!');
        textInput.focus();
        return;
    }
    
    // Add animation effect when changing text
    title.style.animation = 'none';
    title.style.transform = 'scale(0.8)';
    title.style.opacity = '0.5';
    title.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        title.textContent = newText;
        title.style.transform = 'scale(1)';
        title.style.opacity = '1';
        
        setTimeout(() => {
            title.style.animation = 'pulse 2s ease-in-out infinite alternate';
        }, 300);
    }, 150);
    
    // Clear the input field
    textInput.value = '';
    
    // Add button feedback
    updateTextBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        updateTextBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Show success message
    showTemporaryMessage('✨ Text updated!');
}

// Toggle time display function
function toggleTimeDisplay() {
    if (timeDisplay.textContent === '') {
        updateTime();
        showTimeBtn.textContent = 'Hide Time';
        showTemporaryMessage('🕒 Time displayed!');
    } else {
        timeDisplay.textContent = '';
        showTimeBtn.textContent = 'Show Time';
        showTemporaryMessage('⏰ Time hidden!');
    }
}

// Update time function
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const dateString = now.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    timeDisplay.innerHTML = `
        <div style="line-height: 1.2;">
            <div>${timeString}</div>
            <div style="font-size: 0.8em; opacity: 0.7;">${dateString}</div>
        </div>
    `;
    
    // Update every second if time is being displayed
    if (showTimeBtn.textContent === 'Hide Time') {
        setTimeout(updateTime, 1000);
    }
}

// Show temporary message function
function showTemporaryMessage(message) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#messageAnimations')) {
        const style = document.createElement('style');
        style.id = 'messageAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageEl);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 2000);
}

// Add some fun easter eggs
let clickCount = 0;
title.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 5) {
        showTemporaryMessage('🎉 You found an easter egg!');
        title.style.animation = 'none';
        title.style.transform = 'rotate(360deg)';
        title.style.transition = 'transform 1s ease-in-out';
        
        setTimeout(() => {
            title.style.transform = 'rotate(0deg)';
            setTimeout(() => {
                title.style.animation = 'pulse 2s ease-in-out infinite alternate';
            }, 1000);
        }, 1000);
        
        clickCount = 0;
    }
});

// Auto-focus input field when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        textInput.focus();
    }, 1500);
});