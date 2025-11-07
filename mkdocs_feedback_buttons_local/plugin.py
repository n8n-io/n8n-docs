from mkdocs.plugins import BasePlugin
from mkdocs.structure.pages import Page
from mkdocs.utils import meta
import mkdocs.config.config_options as config_options

class FeedbackButtonsPlugin(BasePlugin):
    def __init__(self):
        self.enabled = True
        self.config_scheme = (
            ('positive_text', config_options.Type(str, default='Was this page helpful??')),
            ('negative_text', config_options.Type(str, default='Was this page not helpful?')),
        )

    def on_page_content(self, html, page, config, files):
        """Add feedback buttons to the bottom of each page."""
        feedback_html = f'''
            <div class="feedback-buttons" style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #eee;">
        <div id="initial-feedback" style="display: flex; gap: 1em; align-items: center;">
            <span>Was this page helpful?</span>
            <button onclick="handleFeedback('positive')" style="padding: 0.5em 1em; background: #90EE90; color: #333; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5em;">
                <img src="thumb_up.png" alt="Thumbs up" style="width: 20px; height: 20px;">Yes
            </button>
            <button onclick="handleFeedback('negative')" style="padding: 0.5em 1em; background: #FFB6C1; color: #333; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5em;">
                <img src="thumb_down.png" alt="Thumbs down" style="width: 20px; height: 20px;">No
            </button>
        </div>
        
        <div id="thank-you-message" style="display: none; color: #666">
            Thanks for your feedback!
        </div>
        
        <div id="feedback-form" style="display: none;">
            <div style="display: flex; flex-direction: column; gap: 0.4em; width: 100%;">
                <div style="display: flex; gap: 1em; align-items: center; width: 100%;">
                    <input type="text" id="feedback-input" placeholder="This page needs..." 
                        style="flex: 1; padding: 0.5em; border: 1px solid #ddd; border-radius: 4px;">
                    <button onclick="submitFeedback()" 
                        style="padding: 0.5em 1em; background: #1C9782; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                        Submit
                    </button>
                </div>
                <div style="font-size: 0.75em; color: #666;">We read all feedback personally, promise</div>
            </div>
        </div>
    </div>

    <script>
    // Wait for GA to be fully loaded
    window.addEventListener('load', function() {
        console.log('Window loaded, checking GA status...');
        if (typeof gtag === 'undefined') {
            console.error('GA not loaded properly');
        } else {
            console.log('GA is available');
            // Send a test event
            gtag('event', 'page_view', {
                'page_title': 'Feedback Demo Page',
                'debug_mode': true
            });
        }
    });

    function showElement(id) {
        document.getElementById('initial-feedback').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
        document.getElementById('feedback-form').style.display = 'none';
        document.getElementById(id).style.display = 'flex';
        
        // Focus the input if showing the feedback form
        if (id === 'feedback-form') {
            setTimeout(() => {
                const input = document.getElementById('feedback-input');
                input.focus();
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        submitFeedback();
                    }
                });
            }, 0);
        }
    }

    function handleFeedback(type) {
        console.log('Handling feedback:', type);
        // Send event to Google Analytics
        if (typeof gtag !== 'undefined') {
            try {
                const eventParams = {
                    'event_category': 'page_feedback',
                    'event_label': type,
                    'debug_mode': true,
                    'page_location': window.location.href,
                    'page_title': document.title
                };
                console.log('Sending GA event with params:', eventParams);
                gtag('event', 'feedback', eventParams);
                console.log('GA Event sent successfully');
            } catch (error) {
                console.error('Error sending GA event:', error);
            }
        } else {
            console.warn('Google Analytics (gtag) not found. Event not sent.');
        }
        
        if (type === 'positive') {
            showElement('thank-you-message');
        } else {
            showElement('feedback-form');
        }
    }

    function submitFeedback() {
        const feedbackText = document.getElementById('feedback-input').value;
        console.log('Submitting feedback:', feedbackText);
        
        // Send feedback to Google Analytics
        if (typeof gtag !== 'undefined') {
            try {
                const eventParams = {
                    'event_category': 'page_feedback',
                    'event_label': feedbackText,
                    'debug_mode': true,
                    'page_location': window.location.href,
                    'page_title': document.title,
                    'feedback_length': feedbackText.length
                };
                console.log('Sending GA event with params:', eventParams);
                gtag('event', 'feedback_submitted', eventParams);
                console.log('GA Event sent successfully');
            } catch (error) {
                console.error('Error sending GA event:', error);
            }
        } else {
            console.warn('Google Analytics (gtag) not found. Event not sent.');
        }

        showElement('thank-you-message');
    }
    </script>
        '''
        return html + feedback_html 