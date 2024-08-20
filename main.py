import requests
import json
import urllib.parse
from typing import Optional

def define_env(env):

	@env.macro	
	def templatesWidget(title: str, slug: str, toLoad: int = 3) -> str:
		node_for_template = 'email+imap' if title == 'Email Trigger (IMAP)' else title.replace(' ', '+')

		try:
			response = requests.get(f'https://api.n8n.io/api/templates/search?rows={toLoad}&search={node_for_template}&page=1&sort=views:desc')
			response.raise_for_status()
			data = response.json()
		except requests.RequestException as e:
			return f'<span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span>'

		workflows = data.get("workflows", [])[:toLoad]

		if len(workflows) < 3:
			return f'<span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span>'

		def get_workflow_details(workflow: dict) -> Optional[dict]:
			try:
				return {
					"title": workflow["name"],
					"user": workflow["user"].get("name", "n8n Community"),
					"url": f'https://n8n.io/workflows/{workflow["id"]}/',
				}
			except KeyError:
				return None

		workflow_details = [get_workflow_details(workflow) for workflow in workflows]
		if any(detail is None for detail in workflow_details):
			return f'<span class="n8n-templates-widget-more"><a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse all {title} integration templates</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></span>'

		template_html = ''.join(
			f'<div class="n8n-templates-widget-template">'
			f'<strong>{detail["title"]}</strong>'
			f'<p class="n8n-templates-name">by {detail["user"]}</p>'
			f'<a class="n8n-templates-link" href="{detail["url"]}" target="_blank">View template details</a>'
			f'</div>'
			for detail in workflow_details
		)

		return (
			f'<div class="n8n-templates-widget">'
			f'{template_html}'
			f'<span class="n8n-templates-widget-more">'
			f'<a href="https://n8n.io/integrations/{slug}/" target="_blank">Browse {title} integration templates</a>, or '
			f'<a href="https://n8n.io/workflows/" target="_blank">search all templates</a>'
			f'</span></div>'
		)

	@env.macro	
	def workflowDemo(workflow_endpoint):
		r = requests.get(url = workflow_endpoint)
		wf_data = r.json()
		template_url = f'https://n8n.io/workflows/{wf_data["id"]}/'
		workflow_json = {
			"nodes": wf_data['workflow']['nodes'],
			"connections": wf_data['workflow']['connections']
		}
		encoded_workflow_json = urllib.parse.quote(json.dumps(workflow_json))
		return f"<div class='n8n-workflow-preview'><n8n-demo hidecanvaserrors='true' clicktointeract='true' frame='false' collapseformobile='false' workflow='{encoded_workflow_json}'></n8n-demo><a href='{template_url}' target='_blank'>View template details</a></div>"

