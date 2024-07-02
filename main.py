import requests
import urllib.parse
import json

def define_env(env):

	@env.macro
	def workflowDemo(workflow_endpoint):
		r = requests.get(url = workflow_endpoint)
		wf_data = r.json()
		template_url = f'https://n8n.io/workflows/{wf_data["id"]}-{wf_data["name"].lower().replace(" ", "-").replace(":", "")}/'
		workflow_json = {
			"nodes": wf_data['workflow']['nodes'],
			"connections": wf_data['workflow']['connections']
		}
		encoded_workflow_json = urllib.parse.quote(json.dumps(workflow_json))
		return f"<div class='n8n-workflow-preview'><n8n-demo hidecanvaserrors='true' clicktointeract='true' frame='false' collapseformobile='false' workflow='{encoded_workflow_json}'></n8n-demo><a href='{template_url}' target='_blank'>View template details</a></div>"

