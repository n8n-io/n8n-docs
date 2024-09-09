import requests
import json
import re
import urllib.parse
import sys

def define_env(env):
	# Check if '--no-template' flag is present in the command-line arguments
	no_template = '--no-template' in sys.argv

	@env.macro    
	def templatesWidget(title, slug):
		if no_template:
            # Return a placeholder or a default URL when '--no-template' is used
			return f'<div class="n8n-templates-widget"><p>View templates at <a href="https://n8n.io/workflows/" target="_blank">n8n Workflows</a></p></div>'

        # Original API request logic
		if(title == 'Email Trigger (IMAP)'):
			node_for_template = 'email+imap'
		else:
			node_for_template = title.replace(' ', '+')
		response = requests.get(url = f'https://api.n8n.io/api/templates/search?rows=3&search={node_for_template}&page=1&sort=views:desc')
		data = response.json()
		# not all nodes have three templates
		try:
			workflows = data["workflows"][:3]
			workflow_one, workflow_two, workflow_three = workflows
		except:
			return f'<span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span>'
		# the data is not trustworthy
		try:
			workflow_one_title = workflow_one["name"]
			workflow_one_user = workflow_one["user"]["name"]
			workflow_one_url = f'https://n8n.io/workflows/{workflow_one["id"]}-{workflow_one["name"].lower().replace(" ", "-").replace(":", "")}/'
			workflow_two_title = workflow_two["name"]
			workflow_two_user = workflow_two["user"]["name"]
			workflow_two_url = f'https://n8n.io/workflows/{workflow_two["id"]}-{workflow_two["name"].lower().replace(" ", "-").replace(":", "")}/'
			workflow_three_title = workflow_three["name"]
			workflow_three_url = f'https://n8n.io/workflows/{workflow_three["id"]}-{workflow_three["name"].lower().replace(" ", "-").replace(":", "")}/'
			workflow_three_user = workflow_three["user"]["name"]
		except:
			return f'<span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse all {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span>'		

		return f'<div class="n8n-templates-widget"><div class="n8n-templates-widget-template"><strong>{workflow_one_title}</strong><p class="n8n-templates-name">by {workflow_one_user}</p><a class="n8n-templates-link" href="{workflow_one_url}" target="_blank">View template details</a></div><div class="n8n-templates-widget-template"><strong>{workflow_two_title}</strong><p class="n8n-templates-name">by {workflow_two_user}</p><a class="n8n-templates-link" href="{workflow_two_url}" target="_blank">View template details</a></div><div class="n8n-templates-widget-template"><strong>{workflow_three_title}</strong><p class="n8n-templates-name">by {workflow_three_user}</p><a class="n8n-templates-link" href="{workflow_three_url}" target="_blank">View template details</a></div><span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span></div>'
	
	@env.macro	
	def workflowDemo(workflow_endpoint):
		if no_template:
			return "<div class='n8n-workflow-preview'><p>Workflow preview placeholder.</p></div>"

        # Original API request logic
		r = requests.get(url = workflow_endpoint)
		wf_data = r.json()
		template_url = f'https://n8n.io/workflows/{wf_data["id"]}-{wf_data["name"].lower().replace(" ", "-").replace(":", "")}/'
		workflow_json = {
			"nodes": wf_data['workflow']['nodes'],
			"connections": wf_data['workflow']['connections']
		}
		encoded_workflow_json = urllib.parse.quote(json.dumps(workflow_json))
		return f"<div class='n8n-workflow-preview'><n8n-demo hidecanvaserrors='true' clicktointeract='true' frame='false' collapseformobile='false' workflow='{encoded_workflow_json}'></n8n-demo><a href='{template_url}' target='_blank'>View template details</a></div>"