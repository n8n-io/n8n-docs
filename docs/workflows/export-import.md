---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Export and import workflows
description: Different ways to export and import workflows in n8n.
contentType: howto
---

# Export and import workflows

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. 
You can export and import workflows in several ways. 

--8<-- "_snippets/workflows/sharing-credentials.md"

## Copy-Paste

You can copy and paste a workflow or parts of it by selecting the nodes you want to copy to the clipboard (`Ctrl + c` or `cmd +c`) and pasting it (`Ctrl + v` or `cmd + v`) into the Editor UI.

To select all nodes or a group of nodes, click and drag:
  ![Select a group of nodes](/_images/workflows/export-import/selectingnodes.gif)

## From the Editor UI menu

From the top navigation bar, select the three dots in the upper right <img alt="Workflow menu icon" class="off-glb" src="/_images/common-icons/three-dots-horizontal.png"> to see the following options: 

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

* **Download**: Downloads your current workflow as a JSON file to your computer.
* **Import from URL**: Imports workflow JSON from a URL, for example, [this workflow JSON file on GitHub](https://raw.githubusercontent.com/n8n-io/demo-setup/main/n8n/backup/workflows/srOnR8PAY3u4RSwb.json){:target=_blank .external-link}. 
* **Import from File**: Imports a workflow as a JSON file from your computer.

## From the command line

* Export: See the [full list of commands ](/hosting/cli-commands/#export-workflows-and-credentials){:target="_blank" .external} for exporting workflows or credentials.
* Import: See the [full list of commands ](/hosting/cli-commands/#import-workflows-and-credentials){:target="_blank" .external} for importing workflows or credentials.
* {
  "dibuat pada": "2024-02-23T16:58:31.616Z",
  "diperbarui pada": "2024-02-23T16:58:31.616Z",
  "id": "srOnR8PAY3u4RSwb",
  "nama": "Alur kerja demo",
  "aktif": salah,
  "simpul": [
    {
      "parameter": {},
      "id": "74003dcd-2ac7-4caa-a1cd-adecc5143c07",
      "nama": "Pemicu Obrolan",
      "ketik": "@n8n/n8n-nodes-langchain.chatTrigger",
      "versi tipe": 1,
      "posisi": [
        660,
        340
      ],
      "ID kait web": "cdb5c076-d458-4b9d-8398-f43bd25059b1"
    Bahasa Indonesia:
    {
      "parameter": {},
      "id": "ce8c3da4-899c-4cc4-af73-8096c64eec64",
      "nama": "Rantai LLM Dasar",
      "tipe": "@n8n/n8n-simpul-rantai-lang.chainLlm",
      "versi tipe": 1.3,
      "posisi": [
        880,
        340
      [Bahasa Indonesia]
    Bahasa Indonesia:
    {
      "parameter": {
        "model": "llama3.1:terbaru",
        "pilihan": {}
      Bahasa Indonesia:
      "id": "3dee878b-d748-4829-ac0a-cfd6705d31e5",
      "nama": "Model Obrolan Ollama",
      "ketik": "@n8n/n8n-nodes-langchain.lmChatOllama",
      "versi tipe": 1,
      "posisi": [
        900,
        560
      ],
      "kredensial": {
        "ollamaApi": {
          "id": "xHuYe0MDGOs9IpBW",
          "nama": "akun Ollama"
        }
      }
    }
  ],
  "koneksi": {
    "Pemicu Obrolan": {
      "utama": [
        [
          {
            "node": "Rantai LLM Dasar",
            "tipe": "utama",
            "indeks": 0
          }
        [Bahasa Indonesia]
      [Bahasa Indonesia]
    Bahasa Indonesia:
    "Model Obrolan Ollama": {
      "modelbahasa_ai": [Bahasa Terjemah|
        [Bahasa Indonesia
          {
            "node": "Rantai LLM Dasar",
            "tipe": "ai_languageModel",
            "indeks": 0
          }
        [Bahasa Indonesia]
      [Bahasa Indonesia]
    }
  Bahasa Indonesia:
  "pengaturan": {
    "perintah eksekusi": "v1"
  Bahasa Indonesia:
  "datastatis": null,
  "meta": {Instagram.com|Facebook.com
    "templateCredsSetupCompleted": benar
  Bahasa Indonesia:
  "datapin": {},
  "versiId": "4e2affe6-bb1c-4ddc-92f9-dde0b7656796",
  "jumlahpemicu": 0,
  "tag": [Airlanggayudhoyono.Intel-Mil.Info's]
}
