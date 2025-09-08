document.addEventListener('DOMContentLoaded', function() {
    // Update range slider values in real-time
    const boxSizeSlider = document.getElementById('box_size');
    const boxSizeValue = document.getElementById('box_size_value');
    const borderSlider = document.getElementById('border');
    const borderValue = document.getElementById('border_value');

    // Update box size value display
    if (boxSizeSlider && boxSizeValue) {
        boxSizeSlider.addEventListener('input', function() {
            boxSizeValue.textContent = this.value;
        });
    }

    // Update border value display
    if (borderSlider && borderValue) {
        borderSlider.addEventListener('input', function() {
            borderValue.textContent = this.value;
        });
    }

    // Form validation
    const form = document.getElementById('qrForm');
    const dataInput = document.getElementById('data');

    if (form && dataInput) {
        form.addEventListener('submit', function(e) {
            const data = dataInput.value.trim();
            
            if (!data) {
                e.preventDefault();
                showAlert('Please enter some data to generate QR code', 'error');
                dataInput.focus();
                return;
            }

            if (data.length > 2000) {
                e.preventDefault();
                showAlert('Data is too long. Please keep it under 2000 characters.', 'error');
                dataInput.focus();
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
                submitBtn.disabled = true;
                
                // Re-enable button after form submission (in case of error)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    }

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Textarea auto-resize
    if (dataInput) {
        dataInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Color picker change handlers and transparent background logic
    const fillColorPicker = document.getElementById('fill_color');
    const backColorPicker = document.getElementById('back_color');
    const transparentBgCheckbox = document.getElementById('transparent_bg');

    // Handle transparent background checkbox
    if (transparentBgCheckbox && backColorPicker) {
        function toggleBackgroundColor() {
            if (transparentBgCheckbox.checked) {
                backColorPicker.disabled = true;
                backColorPicker.style.opacity = '0.5';
                backColorPicker.parentElement.querySelector('label').style.opacity = '0.5';
            } else {
                backColorPicker.disabled = false;
                backColorPicker.style.opacity = '1';
                backColorPicker.parentElement.querySelector('label').style.opacity = '1';
            }
        }

        // Initial state
        toggleBackgroundColor();

        // Listen for changes
        transparentBgCheckbox.addEventListener('change', toggleBackgroundColor);
    }

    if (fillColorPicker) {
        fillColorPicker.addEventListener('change', function() {
            console.log('Fill color changed to:', this.value);
        });
    }

    if (backColorPicker) {
        backColorPicker.addEventListener('change', function() {
            console.log('Background color changed to:', this.value);
        });
    }
});

// Helper function to show alerts
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at top of container
    const container = document.querySelector('.container');
    const firstCard = container.querySelector('.card');
    container.insertBefore(alertDiv, firstCard);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to generate QR code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('qrForm');
        if (form) {
            form.submit();
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        const clearBtn = document.querySelector('a[href*="clear"]');
        if (clearBtn) {
            window.location.href = clearBtn.href;
        }
    }
});
