/*
This script contains the functonality for the n8nFeedback.html partial
*/

function showElement(id) {{
    document.getElementById('n8n-ratings-feedback').style.display = 'none';
    document.getElementById('n8n-feedback-thank-you-message').style.display = 'none';
    document.getElementById('n8n-feedback-comment').style.display = 'none';
    document.getElementById(id).style.display = 'flex';

    // Focus the input if showing the feedback form
    if (id === 'n8n-feedback-comment') {{
        setTimeout(() => {{
            const input = document.getElementById('n8n-feedback-input');
            input.focus();
            input.onkeydown = function(e) {
                if (e.key === 'Enter') {{
                    submitFeedback();
                }}
            };
        }}, 0);
    }}
}}

function handleRating(rating) {{
    // Send event to Google Analytics
    if (typeof gtag !== 'undefined') {{
        try {{
            const eventParams = {
                'feedback_rating': rating,
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
        showElement('n8n-feedback-thank-you-message');
    }} else {{
        showElement('n8n-feedback-comment');
    }}
}}

function submitFeedback() {{
    const feedbackText = document.getElementById('n8n-feedback-input').value;
    // Send feedback to Google Analytics
    if (typeof gtag !== 'undefined') {{
        try {{
            const eventParams = {
                'feedback_text': feedbackText,
                'page_location': window.location.href,
                'page_title': document.title,
                'feedback_length': feedbackText.length
            };
            gtag('event', 'feedback_submitted', eventParams);
            plausible("Feedback Comment", { props: { page: eventParams.page_location, feedback_text: eventParams.feedback_text, feedback_length: eventParams.feedback_length } });
        }} catch (error) {{
            console.error('Error sending GA event:', error);
        }}
    }} else {{
        console.warn('Google Analytics (gtag) not found. Event not sent.');
    }}
    showElement('n8n-feedback-thank-you-message');
}}