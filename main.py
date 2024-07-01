import requests
import json
import re

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
		return f'<div style="border:1px solid red"><span>Total workflows: {total_workflows}</span><div><span>{workflow_one["name"]}</span><a href="https://n8n.io/workflows/{workflow_one["id"]}-{workflow_one["name"].lower().replace(" ", "-")}/" target="_blank">View workflow details</a></div><div><span>{workflow_two["name"]}</span><a href="https://n8n.io/workflows/{workflow_two["id"]}-{workflow_two["name"].lower().replace(" ", "-")}/" target="_blank">View workflow details</a></div><div><span>{workflow_three["name"]}</span><a href="https://n8n.io/workflows/{workflow_three["id"]}-{workflow_three["name"].lower().replace(" ", "-")}/" target="_blank">View workflow details</a></div><a href="https://n8n.io/integrations/{nodeForIntegrationsSlug}/" target="_blank">View more templates for this node</a>, or <a href="https://n8n.io/workflows/" target="_blank">search all templates</a></div>'
