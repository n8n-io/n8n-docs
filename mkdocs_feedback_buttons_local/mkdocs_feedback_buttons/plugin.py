from mkdocs.plugins import BasePlugin
from mkdocs.structure.pages import Page
from mkdocs.utils import meta
import mkdocs.config.config_options as config_options
import os
import shutil

class FeedbackButtonsPlugin(BasePlugin):
    def __init__(self):
        self.enabled = True
        self.config_scheme = (
            ('question', config_options.Type(str, default="This page was")),
            ('positive_button_text', config_options.Type(str, default="Helpful")),
            ('negative_button_text', config_options.Type(str, default="Not helpful")),
            ('input_placeholder', config_options.Type(str, default="This page needs...")),
            ('input_hint', config_options.Type(str, default="We read all feedback personally, promise ✨")),
            ('thank_you_message', config_options.Type(str, default="Thanks for your feedback!")),
            ('ga_property', config_options.Type(str, default="")),
            ('min_content_length', config_options.Type(int, default=0)),  # Minimum content length in characters
        )

    def on_post_page(self, output, page, config):
        """Inject the analytics script into the head of the page."""
        if not self.config['ga_property']:
            return output

        analytics_script = f'''
    <script id="__n8n_analytics">
        // Define gtag in global scope
        window.dataLayer = window.dataLayer || [];
        function gtag() {{
            console.log('gtag called with:', arguments);
            dataLayer.push(arguments);
            console.log('Current dataLayer:', dataLayer);
        }}

        function __n8n_analytics() {{
            gtag('js', new Date());
            gtag('config', '{self.config["ga_property"]}', {{
                'debug_mode': true,
                'send_page_view': true
            }});
            
            // Load GA script dynamically
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id={self.config["ga_property"]}';
            script.onload = function() {{
                console.log('GA script loaded successfully');
                // Send a test event
                gtag('event', 'page_view', {{
                    'page_title': 'Feedback Demo Page',
                    'debug_mode': true
                }});
            }};
            document.getElementById('__n8n_analytics').insertAdjacentElement('afterEnd', script);
        }}
        __n8n_analytics();
    </script>
        '''
        # Insert the script into the head of the page
        if '</head>' in output:
            output = output.replace('</head>', f'{analytics_script}</head>')
        return output

    def on_page_content(self, html, page, config, files):
        """Add feedback buttons to the bottom of each page."""
        # Check if content length meets minimum requirement
        min_length = self.config.get('min_content_length', 0)
        if min_length > 0:
            content_length = len(page.markdown)
            if content_length < min_length:
                return html

        # Get the path to the assets directory
        assets_dir = os.path.join(os.path.dirname(__file__), 'assets')
        
        # Create the assets directory in the docs directory if it doesn't exist
        docs_assets_dir = os.path.join(config['docs_dir'], 'assets', 'feedback-buttons')
        os.makedirs(docs_assets_dir, exist_ok=True)
        
        # Copy assets to the docs directory
        for asset in os.listdir(assets_dir):
            src = os.path.join(assets_dir, asset)
            dst = os.path.join(docs_assets_dir, asset)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
        
        site_url = config.get('site_url', '').rstrip('/')

        # Use the copied assets in the HTML
        feedback_html = f'''
    <div class="feedback-buttons" style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #eee;">
        <div id="initial-feedback" style="display: flex; gap: 1em; align-items: center;">
            <span>{self.config['question']}</span>
            <button onclick="handleRating('positive')" style="padding: 0.5em 1em; background: #90EE90; color: #333; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5em;">
                <img src="{site_url}/assets/feedback-buttons/thumb_up.png" alt="Thumbs up" style="width: 20px; height: 20px; border: none !important;">{self.config['positive_button_text']}
            </button>
            <button onclick="handleRating('negative')" style="padding: 0.5em 1em; background: #FFB6C1; color: #333; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5em;">
                <img src="{site_url}/assets/feedback-buttons/thumb_down.png" alt="Thumbs down" style="width: 20px; height: 20px; border: none !important;">{self.config['negative_button_text']}
            </button>
        </div>
        
        <div id="thank-you-message" style="display: none; color: #666">
            {self.config['thank_you_message']}
        </div>
        
        <div id="feedback-form" style="display: none;">
            <div style="display: flex; flex-direction: column; gap: 0.4em; width: 100%;">
                <div style="display: flex; gap: 1em; align-items: center; width: 100%;">
                    <input type="text" id="feedback-input" placeholder="{self.config['input_placeholder']}" 
                        style="flex: 1; font-size: 1em; padding: 0.5em; border: 1px solid #ddd; border-radius: 4px;">
                    <button onclick="submitFeedback()" 
                        style="padding: 0.5em 1em; background: #1C9782; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                        Submit
                    </button>
                </div>
                <div style="font-size: 0.75em; color: #666;">{self.config['input_hint']}</div>
            </div>
        </div>
    </div>

    <script>
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

    function handleRating(type) {{
        console.log('Handling rating:', type);
        // Send event to Google Analytics
        if (typeof gtag !== 'undefined') {{
            try {{
                const eventParams = {{
                    'event_category': 'page_rating',
                    'event_label': type,
                    'debug_mode': true,
                    'page_location': window.location.href,
                    'page_title': document.title
                }};
                console.log('Sending GA event with params:', eventParams);
                gtag('event', 'feedback', eventParams);
                console.log('GA Event sent successfully');
                console.log('Current dataLayer:', window.dataLayer);
            }} catch (error) {{
                console.error('Error sending GA event:', error);
            }}
        }} else {{
            console.warn('Google Analytics (gtag) not found. Event not sent.');
        }}
        
        if (type === 'positive') {{
            showElement('thank-you-message');
        }} else {{
            showElement('feedback-form');
        }}
    }}

    function submitFeedback() {{
        const feedbackText = document.getElementById('feedback-input').value;
        console.log('Submitting feedback:', feedbackText);
        
        // Send feedback to Google Analytics
        if (typeof gtag !== 'undefined') {{
            try {{
                const eventParams = {{
                    'event_category': 'page_feedback',
                    'event_label': feedbackText,
                    'debug_mode': true,
                    'page_location': window.location.href,
                    'page_title': document.title,
                    'feedback_length': feedbackText.length
                }};
                console.log('Sending GA event with params:', eventParams);
                gtag('event', 'feedback_submitted', eventParams);
                console.log('GA Event sent successfully');
                console.log('Current dataLayer:', window.dataLayer);
            }} catch (error) {{
                console.error('Error sending GA event:', error);
            }}
        }} else {{
            console.warn('Google Analytics (gtag) not found. Event not sent.');
        }}

        showElement('thank-you-message');
    }}
    </script>
        '''
        
        return html + feedback_html 