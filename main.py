import requests

def define_env(env):
    "Hook function"

    @env.macro
    def workflowDemo(workflow_endpoint):
        r = requests.get(url = workflow_endpoint)
        workflow_json = r.content.decode("utf-8")
        print(workflow_json)
        return f"<div class='workflow_preview'><n8n-demo clicktointeract='true' frame='true' collapseformobile='false' workflow={workflow_json}></n8n-demo></div>"

