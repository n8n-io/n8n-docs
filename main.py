import requests
import json
import re
import urllib.parse

def define_env(env):

	@env.macro
	
	def topThreeTemplates(title, page):
		nodeForTemplate = title.replace(' ', '+')
		getLastBitOfUrl = re.search("(\.)(.*)(\/)$", page.abs_url)
		nodeForIntegrationsSlug = getLastBitOfUrl.group(2)
		r = requests.get(url = f'https://api.n8n.io/api/templates/search?rows=3&search=&category=&apps={nodeForTemplate}&page=1&sort=views:desc')
		toDict = json.loads(r.content.decode('utf-8'))
		total_workflows = toDict["totalWorkflows"]
		workflow_one = toDict["workflows"][0]
		workflow_two = toDict["workflows"][1]
		workflow_three = toDict["workflows"][2]
		print(nodeForIntegrationsSlug)
		return f'<div style="border:1px solid red"><span>Total workflows: {total_workflows}</span><div><span>{workflow_one["name"]}</span><a href="https://n8n.io/workflows/{workflow_one["id"]}-{workflow_one["name"].lower().replace(" ", "-").replace(":", "")}/" target="_blank">View workflow details</a></div><div><span>{workflow_two["name"]}</span><a href="https://n8n.io/workflows/{workflow_two["id"]}-{workflow_two["name"].lower().replace(" ", "-").replace(":", "")}/" target="_blank">View workflow details</a></div><div><span>{workflow_three["name"]}</span><a href="https://n8n.io/workflows/{workflow_three["id"]}-{workflow_three["name"].lower().replace(" ", "-").replace(":", "")}/" target="_blank">View workflow details</a></div><a href="https://n8n.io/integrations/{nodeForIntegrationsSlug}/" target="_blank">View more templates for this node</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></div>'
	
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

