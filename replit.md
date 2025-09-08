# QR Code Generator

## Overview

A Flask-based web application that generates customizable QR codes with a clean, modern interface. Users can input text or URLs and customize the appearance of their QR codes with options for colors, size, and border width. The application provides real-time preview functionality and download capabilities for generated QR codes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask for server-side rendering
- **UI Framework**: Bootstrap 5 with dark theme support for responsive design
- **Styling**: Custom CSS for enhanced visual appeal and theming
- **Client-side Interactivity**: Vanilla JavaScript for form validation, real-time slider updates, and user feedback
- **Icons**: Font Awesome for consistent iconography

### Backend Architecture
- **Web Framework**: Flask with simple routing structure
- **QR Code Generation**: Python `qrcode` library with PIL for image processing
- **Session Management**: Flask sessions with configurable secret key
- **Error Handling**: Flash messaging system for user feedback
- **Logging**: Python logging module for debugging and monitoring

### Application Structure
- **Single Page Application**: Main interface on index route with form submission
- **Form Processing**: POST endpoint for QR code generation with validation
- **File Handling**: In-memory image processing and base64 encoding for previews
- **Download System**: Direct file serving for QR code downloads

### Data Flow
- **Input Validation**: Server-side validation for data length, box size, and border parameters
- **QR Generation**: Configurable QR code creation with custom colors and sizing
- **Preview System**: Base64-encoded images for immediate preview without file I/O
- **Download Handling**: Temporary file generation for user downloads

## External Dependencies

### Python Libraries
- **Flask**: Web framework for routing and template rendering
- **qrcode**: QR code generation with customization options
- **PIL (Pillow)**: Image processing and manipulation
- **Standard Library**: os, io, base64, logging, datetime for core functionality

### Frontend Dependencies
- **Bootstrap 5**: CSS framework via CDN for responsive UI components
- **Font Awesome 6**: Icon library via CDN for visual elements
- **No JavaScript Frameworks**: Uses vanilla JavaScript for lightweight interactions

### Runtime Environment
- **Python Runtime**: Flask development server configuration
- **Static File Serving**: Flask's built-in static file handling for CSS and JavaScript
- **Template Rendering**: Jinja2 template engine for dynamic HTML generation