import os
import io
import base64
import logging
from datetime import datetime
from flask import Flask, render_template, request, send_file, flash, redirect, url_for
import qrcode
from PIL import Image

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key_for_dev")

@app.route('/')
def index():
    """Render the main QR code generator page"""
    return render_template('index.html')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    """Generate QR code based on form data and return for preview"""
    try:
        # Get form data
        data = request.form.get('data', '').strip()
        fill_color = request.form.get('fill_color', '#000000')
        back_color = request.form.get('back_color', '#ffffff')
        box_size = int(request.form.get('box_size', 10))
        border = int(request.form.get('border', 4))
        
        # Validate input
        if not data:
            flash('Please enter some data to generate QR code', 'error')
            return redirect(url_for('index'))
        
        if box_size < 1 or box_size > 50:
            flash('Box size must be between 1 and 50', 'error')
            return redirect(url_for('index'))
            
        if border < 0 or border > 20:
            flash('Border must be between 0 and 20', 'error')
            return redirect(url_for('index'))
        
        # Create QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=box_size,
            border=border,
        )
        
        qr.add_data(data)
        qr.make(fit=True)
        
        # Create image
        img = qr.make_image(fill_color=fill_color, back_color=back_color)
        
        # Convert to base64 for preview
        img_buffer = io.BytesIO()
        img.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
        
        # Store generation parameters in session for download
        from flask import session
        session['qr_data'] = {
            'data': data,
            'fill_color': fill_color,
            'back_color': back_color,
            'box_size': box_size,
            'border': border
        }
        
        return render_template('index.html', 
                             preview_image=img_base64,
                             form_data=session['qr_data'])
        
    except ValueError as e:
        flash(f'Invalid input: {str(e)}', 'error')
        return redirect(url_for('index'))
    except Exception as e:
        app.logger.error(f'Error generating QR code: {str(e)}')
        flash('An error occurred while generating the QR code. Please try again.', 'error')
        return redirect(url_for('index'))

@app.route('/download_qr')
def download_qr():
    """Download the generated QR code as PNG file"""
    try:
        from flask import session
        
        if 'qr_data' not in session:
            flash('No QR code to download. Please generate one first.', 'error')
            return redirect(url_for('index'))
        
        qr_data = session['qr_data']
        
        # Recreate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=qr_data['box_size'],
            border=qr_data['border'],
        )
        
        qr.add_data(qr_data['data'])
        qr.make(fit=True)
        
        # Create image
        img = qr.make_image(
            fill_color=qr_data['fill_color'], 
            back_color=qr_data['back_color']
        )
        
        # Save to buffer
        img_buffer = io.BytesIO()
        img.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'qrcode_{timestamp}.png'
        
        return send_file(
            img_buffer,
            mimetype='image/png',
            as_attachment=True,
            download_name=filename
        )
        
    except Exception as e:
        app.logger.error(f'Error downloading QR code: {str(e)}')
        flash('An error occurred while downloading the QR code. Please try again.', 'error')
        return redirect(url_for('index'))

@app.route('/clear')
def clear():
    """Clear the current QR code and form data"""
    from flask import session
    session.pop('qr_data', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
