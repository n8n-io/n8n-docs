---
title: n8n public REST API — Automate Everything, Integrate Anything
description: Unlock the full power of n8n with its public REST API. Build, manage, and scale your automations programmatically. Comprehensive docs, authentication guides, and endpoint references included.
contentType: overview
search:
    boost: 5
	hide:
	    - feedback
		    - kapaButton
			---

			# n8n public REST API

			/// info | Feature availability
			The n8n API isn't available during the free trial. Please upgrade to access this feature.
			///

			## Your automation platform, fully unlocked

			n8n's powerful public [REST API](/glossary.md#api) gives you **full programmatic control** over your workflows, credentials, and executions — everything you can do in the GUI, and more. Whether you're building internal tools, integrating n8n into your own platform, or managing hundreds of workflows at scale, the API has you covered.

			**With the n8n API you can:**

			* Trigger and manage workflows on demand
			* Create, update, and delete credentials programmatically
			* Monitor execution history and track performance
			* Build custom dashboards and integrations on top of n8n
			* Automate your automation — manage n8n itself with code

			**Get started quickly:**

			* [Authenticate](/api/authentication.md) — secure your API access in minutes
			* [Pagination](/api/pagination.md) — efficiently handle large result sets
			* [API Playground](/api/using-api-playground.md) — test endpoints live in your browser (self-hosted n8n only)
			* [Endpoint Reference](/api/api-reference.md) — full documentation of every available endpoint

			> **Pro tip:** Use the [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) to call the API directly from within your workflows — no external tools needed.

			---

			## New to REST APIs? No problem.

			The n8n API is built on industry-standard REST principles, so if you know HTTP, you already know the basics. Not sure where to start? These resources will get you up to speed fast:

			* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis): a beginner-friendly introduction with real-world examples of calling REST APIs.
			* [IBM Cloud — What is an API?](https://www.ibm.com/cloud/learn/api): a clear, technical introduction to APIs and how they work.
			* [IBM Cloud — What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis): a deeper dive into REST architecture and best practices.
			* [MDN — An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): understand the HTTP verbs and methods that power every REST API.

			/// tip | Try it before you build it
			Explore the API hands-on in the [built-in playground](/api/using-api-playground.md). Test endpoints safely, see real responses, and get confident before writing a single line of code. Set up a test workflow or a separate n8n instance to experiment without touching live data.
			///

			---

			## n8n Public REST API — Po polsku

			### Twoja platforma automatyzacji, w pełni odblokowana

			Dzięki publicznemu [REST API n8n](/glossary.md#api) zyskujesz **pełną, programistyczną kontrolę** nad swoimi workflow'ami, danymi uwierzytelniającymi i historią wykonań. Wszystko, co możesz zrobić przez interfejs graficzny — i jeszcze więcej — teraz dostępne przez API.

			**Co możesz robić z API n8n:**

			* Uruchamiać i zarządzać workflow'ami na żądanie
			* Tworzyć, aktualizować i usuwać dane uwierzytelniające z poziomu kodu
			* Monitorować historię wykonań i śledzić wydajność
			* Budować własne dashboardy i integracje oparte na n8n
			* Automatyzować samo narzędzie — zarządzaj n8n kodem

			**Zacznij w kilka minut:**

			* [Uwierzytelnianie](/api/authentication.md) — zabezpiecz dostęp do API
			* [Paginacja](/api/pagination.md) — obsługuj duże zestawy danych bez problemu
			* [Plac zabaw API](/api/using-api-playground.md) — testuj endpointy na żywo w przeglądarce (tylko n8n self-hosted)
			* [Dokumentacja endpointów](/api/api-reference.md) — pełna lista dostępnych zasobów i operacji

			> **Wskazówka:** Skorzystaj z [węzła n8n API](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md), aby wywoływać API bezpośrednio z poziomu swoich workflow'ów — bez żadnych zewnętrznych narzędzi.

			### Nowicjusz w REST API? Nie ma problemu.

			API n8n opiera się na standardowym protokole REST — jeśli znasz HTTP, masz już solidne podstawy. Jeśli dopiero zaczynasz, te zasoby pomogą Ci szybko wejść w temat:

			* [Przewodnik KnowledgeOwl po API](https://support.knowledgeowl.com/help/working-with-apis): przyjazne wprowadzenie dla początkujących z praktycznymi przykładami.
			* [IBM Cloud — Czym jest API?](https://www.ibm.com/cloud/learn/api): przejrzyste, techniczne wprowadzenie do świata API.
			* [IBM Cloud — Czym jest REST API?](https://www.ibm.com/cloud/learn/rest-apis): głębsze spojrzenie na architekturę REST i najlepsze praktyki.
			* [MDN — Przegląd HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): poznaj metody HTTP, które napędzają każde REST API.
