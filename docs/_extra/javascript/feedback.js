/*
This script contains the functonality for the n8nFeedback.html partial
*/

function showElement(id) {{
    document.getElementById('initial-feedback').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'none';
    document.getElementById('feedback-form').style.display = 'none';
    document.getElementById(id).style.display = 'flex';
    
    // Focus the input if showing the feedback form
    if (id === 'feedback-form') {{
        setTimeout(() => {{
            const input = document.getElementById('feedback-input');
            input.focus();
            input.addEventListener('keypress', function(e) {{
                if (e.key === 'Enter') {{
                    submitFeedback();
                }}
            }});
        }}, 0);
    }}
}}

function handleRating(rating) {{
    // Send event to Google Analytics
    if (typeof gtag !== 'undefined') {{
        try {{
            const eventParams = {
                'event_category': 'page_rating',
                'event_value': rating,
                'page_location': window.location.href,
                'page_title': document.title
            };
            gtag('event', 'feedback', eventParams);
        }} catch (error) {{
            console.error('Error sending GA event:', error);
        }}
    }} else {{
        console.warn('Google Analytics (gtag) not found. Event not sent.');
    }}
    
    if (rating === 'positive') {{
        showElement('thank-you-message');
    }} else {{
        showElement('feedback-form');
    }}
}}

function submitFeedback() {{
    const feedbackText = document.getElementById('feedback-input').value;
    // Send feedback to Google Analytics
    if (typeof gtag !== 'undefined') {{
        try {{
            const eventParams = {
                'event_category': 'page_feedback',
                'event_value': feedbackText,
                'page_location': window.location.href,
                'page_title': document.title,
                'feedback_length': feedbackText.length
            };
            gtag('event', 'feedback_submitted', eventParams);
        }} catch (error) {{
            console.error('Error sending GA event:', error);
        }}
    }} else {{
        console.warn('Google Analytics (gtag) not found. Event not sent.');
    }}
    showElement('thank-you-message');
}}