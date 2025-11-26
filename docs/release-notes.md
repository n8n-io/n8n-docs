{
  "name": "Veo 3.1 UGC Workflow 2026",
  "nodes": [
    {
      "parameters": {
        "updates": [
          "message"
        ],
        "additionalFields": {}
      },
      "type": "n8n-nodes-base.telegramTrigger",
      "typeVersion": 1.2,
      "position": [
        624,
        880
      ],
      "id": "7ef2b9e5-b937-4007-a3aa-8baacc01fb65",
      "name": "Telegram Trigger",
      "webhookId": "0631fdd5-9b1c-46fd-aef1-60686a703adf",
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.message.photo }}",
                    "rightValue": "",
                    "operator": {
                      "type": "array",
                      "operation": "exists",
                      "singleValue": true
                    },
                    "id": "94e5aba5-fd12-4779-8524-e567cc08aa98"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "image"
            }
          ]
        },
        "options": {
          "fallbackOutput": "extra"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.3,
      "position": [
        848,
        880
      ],
      "id": "20faef08-fb15-4a78-86f1-aa0b3f6ff495",
      "name": "Switch"
    },
    {
      "parameters": {
        "resource": "image",
        "operation": "analyze",
        "modelId": {
          "__rl": true,
          "value": "models/gemini-2.5-flash",
          "mode": "list",
          "cachedResultName": "models/gemini-2.5-flash"
        },
        "text": "Describe the visual style, subject matter, and composition of this image. Is it a lifestyle image, a product-only shot, or a combination? Include lighting style and camera angle if possible.",
        "inputType": "binary",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.googleGemini",
      "typeVersion": 1,
      "position": [
        1296,
        784
      ],
      "id": "74b33095-757c-4da5-b727-26a1bdd3c7da",
      "name": "Analyze an image",
      "credentials": {
        "googlePalmApi": {
          "id": "XNrgPI7zYwLECeVM",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {
        "resource": "file",
        "fileId": "={{ $json.message.photo[2].file_id }}",
        "additionalFields": {}
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        1072,
        784
      ],
      "id": "255ee2d1-aa56-42c2-a294-a89f00e2b403",
      "name": "Get a file",
      "webhookId": "d607846b-96c1-40f8-9fc8-6bfab548f614",
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.output.message }}",
        "hasOutputParser": true,
        "needsFallback": true,
        "options": {
          "systemMessage": "=أنت وكيل ذكاء اصطناعي (AI Agent) متخصص في إنشاء محتوى UGC (المحتوى الذي ينشئه المستخدم) تلقائيًا بناءً على الصور والتعليقات الوصفية من المستخدم. يمكن للمستخدم إرسال صورة مع تعليق وصفي لتكون مصدر البيانات. مهمتك هي:\nالمدخلات التي تستقبلها:\nصورة مرجعية وتعليق وصفي من المستخدم (وصف للمنتج/الفكرة).\nوصف بصري للصورة تم تحليله مسبقًا بواسطة الذكاء الاصطناعي.\nالمخرجات المطلوبة:\nبناءً على التعليق الوصفي ووصف الصورة، قم بإنشاء هيكل بيانات JSON بالتنسيق التالي:\ntitle: عنوان جذاب وملائم للمنتج أو محتوى الـ UGC.\ndescription: وصف موجز للمحتوى الإعلاني (UGC) بشكل عام.\nprompts: مجموعة (Array) تحتوي على كائنات (objects) بعدد التنويعات التي يطلبها المستخدم، وكل كائن يحتوي على:\nimage: أمر (Prompt) وصفي بصري لإنتاج نسخة متنوعة وجذابة من صورة الـ UGC، مع تنويع في الخلفية، الحالة المزاجية، الإضاءة، أو الألوان. حافظ على العنصر الأساسي (المنتج، زاوية الكاميرا، الإطار) من الصورة المرجعية. قم دائمًا بتضمين نسبة العرض إلى الارتفاع (1:1 أو 4:5).\nvideo: سيناريو أو فكرة فيديو UGC (فيديو منتج) إبداعية وتكمّل أمر الصورة. يجب أن يكون الفيديو طبيعيًا، جذابًا، ويدعم السرد القصصي للـ UGC.\ncaption: جملة قصيرة باللغة العربية تكون ملهمة، جذابة، وتدعم الصورة والفيديو.\ndialog (اختياري): حوار باللغة العربية لفيديو الـ UGC، سواء كان سردًا من مؤثر (influencer) أو تعليقًا صوتيًا قصيرًا، على أن يكون طبيعيًا وجذابًا.\nإرشادات لأمر إنشاء الصورة (Image Prompt):\nحافظ على العنصر الأساسي في الصورة المرجعية (المنتج، زاوية الكاميرا، التكوين الأساسي).\nنوّع فقط في الخلفية، البيئة المحيطة، الحالة المزاجية، الإضاءة، أو معالجة الألوان.\nأمثلة على التنويع:\nإضاءة نهارية ساطعة مقابل إضاءة الغروب/الساعة الذهبية.\nأجواء بجانب حمام السباحة مقابل سطح رخامي فاخر.\nدرجات ألوان اللافندر الهادئة مقابل ألوان رمال الشاطئ الدافئة.\nطابع صيفي حيوي مقابل هدوء منتجع صحي (Spa).\nاستخدم لغة حية وحسية لوصف كل تنويع.\nقم دائمًا بتضمين نسبة العرض إلى الارتفاع (aspect ratio) (1:1 أو 4:5).\nلا تقم بإضافة شعارات، طبقات نصية، أو تغييرات على العنصر الأساسي.\nإرشادات لأمر إنشاء الفيديو (Video Prompt):\nيجب أن يدعم الفيديو ويكمل أمر إنشاء الصورة.\nيجب أن يكون سيناريو فيديو الـ UGC إبداعيًا، طبيعيًا، وملائمًا للمنتج.\nحاول أن يكون هناك تسلسل إبداعي بين أوامر الفيديو لجعل المحتوى متناغمًا ضمن السرد العام للـ UGC.\nأمثلة: \"لقطة بطيئة (Slow motion) لمؤثرة تمسك بالمنتج مع إضاءة طبيعية\"، \"فيديو سريع (Timelapse) لفتح علبة المنتج على طاولة خشبية بسيطة مع موسيقى تصويرية حماسية\".\nإرشادات للتعليق والحوار (Caption & Dialog):\nالتعليق (Caption): جملة قصيرة باللغة العربية تكون جذابة، ملهمة، وتدعم المحتوى البصري (مثال: \"عيشي الانتعاش الطبيعي كل يوم!\").\nالحوار (Dialog): حوار باللغة العربية لفيديو الـ UGC بمدة أقصاها 8 ثوانٍ. يجب أن يكون طبيعيًا، جذابًا، وسهل الفهم. أمثلة على التنسيقات:\nتعليق صوتي قصير (3-5 ثوانٍ): سرد قصير ومباشر (مثال: \"هذا هو المنتج اللي يخلي بشرتك تلمع!\" أو \"يدوم حتى 12 ساعة، رفيقك الدائم!\").\nحوار مؤثر (5-8 ثوانٍ): مونولوج طبيعي وكأن المؤثر يتحدث مباشرة إلى الكاميرا (مثال: \"يا جماعة، جربت هالمنتج والنتيجة... واو! بشرتي صارت أفتح وأنور!\").\nهوك + دعوة لاتخاذ إجراء (4-6 ثوانٍ): ابدأ بسؤال أو جملة مثيرة، ثم ادعُ المتابعين لاتخاذ إجراء (مثال: \"قد جربتوا منتج يسوي فرق من أول استخدام؟ جربوا هذا! الرابط في البايو!\").\nمثال على المخرجات (JSON):\ncode\nJSON\n{\n  \"title\": \"مجموعة UGC لتألق البشرة الطبيعي\",\n  \"description\": \"محتوى UGC للترويج لمنتج عناية بالبشرة مع تنويعات بصرية متعددة وجذابة.\",\n  \"prompts\": [\n    {\n      \"image\": \"لقطة بجانب حمام سباحة مشمس، المنتج على حافة رخامية أثناء الساعة الذهبية، مع ظلال ناعمة ودرجات ألوان دافئة. نسبة العرض 1:1.\",\n      \"video\": \"فيديو بحركة بطيئة لمؤثرة ترفع المنتج على حافة المسبح مع إضاءة الساعة الذهبية.\",\n      \"caption\": \"عيشي الانتعاش على حافة مسبحك المفضل!\",\n      \"dialog\": \"هذا هو المنتج اللي يخلي بشرتك تلمع طول اليوم!\"\n    },\n    {\n      \"image\": \"خلفية شاطئ عند الغروب بدرجات ألوان اللافندر الباردة خلف المنتج، مع إبراز الانعكاسات المعدنية اللامعة. نسبة العرض 4:5.\",\n      \"video\": \"فيديو سريع (Timelapse) للمنتج على رمال الشاطئ وقت الغروب مع صوت الأمواج في الخلفية.\",\n      \"caption\": \"اجلبي انتعاش الشاطئ لروتين العناية الخاص بكِ.\",\n      \"dialog\": \"هالمنتج مثالي للي يحبون أجواء البحر والشاطئ!\"\n    },\n    {\n      \"image\": \"...\",\n      \"video\": \"...\",\n      \"caption\": \"...\",\n      \"dialog\": \"...\"\n    }\n  ]\n}\nآلية التفكير (فحص الجودة):\nقبل إنتاج المخرجات النهائية، قم بالتالي:\nتأكد من أن كل أمر (prompt) لإنشاء الصورة يحافظ على العنصر الأساسي وتكوين الصورة المرجعية.\nالتنويع يقتصر فقط على العناصر الداعمة (الخلفية، المزاج، الإضاءة، الألوان).\nأمر الفيديو يدعم ويكمل أمر الصورة بسيناريو طبيعي ومناسب.\nالتعليق والحوار باللغة العربية، وهما جذابان وملائمان.\nمخرجات JSON صالحة وسهلة المعالجة ضمن سير عمل الأتمتة.\nتحقق دائمًا من أن مخرجات JSON النهائية صالحة، إبداعية، ملائمة، وسهلة المعالجة ضمن سير عمل أتمتة محتوى الـ UGC."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3,
      "position": [
        1840,
        784
      ],
      "id": "02ac750f-249f-4239-a2ad-7960637413f4",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "a2d87366-bc93-40f2-8186-37ccd67c1fba",
              "name": "output.message",
              "value": "=Deskripsi gambar: {{ $json.content.parts[0].text }}\n\n{{ $('Telegram Trigger').item.json.message.caption && \"Buatkan video UGC mengenai: \" + $('Telegram Trigger').item.json.message.caption }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1520,
        784
      ],
      "id": "6f45811b-0522-42e2-920e-f6c1f454c2f5",
      "name": "Edit Fields"
    },
    {
      "parameters": {
        "model": "openai/gpt-5-mini",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "position": [
        1856,
        992
      ],
      "id": "4aa8d376-546d-4ede-b7b2-a3fa9463a756",
      "name": "GPT-5-Mini",
      "credentials": {
        "openRouterApi": {
          "id": "T2zzbkt7VGLV4CRr",
          "name": "OpenRouter account"
        }
      }
    },
    {
      "parameters": {
        "modelName": "models/gemini-2.5-pro",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [
        1696,
        960
      ],
      "id": "01529f56-845c-43d6-94b6-50069265f8da",
      "name": "Google Gemini Chat Model",
      "credentials": {
        "googlePalmApi": {
          "id": "XNrgPI7zYwLECeVM",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {
        "jsonSchemaExample": "{\n  \"title\": \"Koleksi UGC Skincare Natural Glow\",\n  \"description\": \"Konten UGC untuk promosi skincare dengan berbagai variasi visual yang menarik dan engaging.\",\n  \"prompts\": [\n    {\n      \"image\": \"Sun-drenched poolside shot produk di atas marble ledge saat golden hour, dengan bayangan lembut dan tone hangat. Aspect ratio 1:1.\",\n      \"video\": \"Slow motion video influencer mengangkat produk di tepi kolam dengan cahaya golden hour\",\n      \"caption\": \"Rasakan kesegaran di tepi kolam renang favoritmu!\",\n      \"dialog\": \"Ini dia produk yang bikin kulit kamu glowing sepanjang hari!\"\n    },\n    {\n      \"image\": \"Cool lavender-tinted sunset beach backdrop di belakang produk, highlight aksen metalik reflektif. Aspect ratio 4:5.\",\n      \"video\": \"Timelapse produk di pasir pantai saat sunset dengan ombak sebagai latar belakang\",\n      \"caption\": \"Bawa kesegaran pantai ke rutinitas skincare kamu.\",\n      \"dialog\": \"Produk ini cocok banget buat kamu yang suka vibe pantai!\"\n    },\n    {\n      \"image\": \"...\",\n      \"video\": \"...\",\n      \"caption\": \"...\",\n      \"dialog\": \"...\"\n    }\n  ]\n}"
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [
        2128,
        960
      ],
      "id": "7ada3ef5-340a-4251-ab45-0e42de5caa85",
      "name": "Structured Output Parser"
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.toolThink",
      "typeVersion": 1.1,
      "position": [
        2000,
        992
      ],
      "id": "295714a6-2268-4310-a7ee-5395facf4ab0",
      "name": "Think"
    },
    {
      "parameters": {
        "fieldToSplitOut": "output.prompts",
        "options": {}
      },
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        2432,
        976
      ],
      "id": "facb4c65-bed9-4a67-bc63-f3f4f12ab476",
      "name": "Split Out"
    },
    {
      "parameters": {
        "resource": "image",
        "operation": "edit",
        "prompt": "={{ $('Loop Over Items').item.json.image }}",
        "images": {
          "values": [
            {}
          ]
        },
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.googleGemini",
      "typeVersion": 1,
      "position": [
        1072,
        1296
      ],
      "id": "4d67d0ac-ef6f-4e48-aa96-109ac88190e9",
      "name": "Edit an image",
      "retryOnFail": true,
      "credentials": {
        "googlePalmApi": {
          "id": "XNrgPI7zYwLECeVM",
          "name": "Google Gemini(PaLM) Api account"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "const binary = $('Get a file').first().binary;\nreturn [{ binary }];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        848,
        1376
      ],
      "id": "a37f785b-acd7-4ba1-adad-7cf13fd40c4a",
      "name": "Get Binary Data"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        624,
        1296
      ],
      "id": "ccf4298b-4fd3-41bb-931f-bb3fa2d8c799",
      "name": "Loop Over Items"
    },
    {
      "parameters": {
        "operation": "binaryToPropery",
        "binaryPropertyName": "edited",
        "options": {}
      },
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        1296,
        1376
      ],
      "id": "36b0f147-f639-4475-a3b7-21640c600de1",
      "name": "Extract from File"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "c3ade2a4-8005-4135-aa29-532db739db5f",
              "name": "YOUR-PROJECT-ID",
              "value": "peppy-web-697501-i8",
              "type": "string"
            },
            {
              "id": "ad36d2ff-06a7-469b-9bb9-619d090a2f41",
              "name": "BASE64-EDITED-IMAGE",
              "value": "={{ $json.data }}",
              "type": "string"
            },
            {
              "id": "448020ae-8eb2-4957-9ba7-13a088e19e8e",
              "name": "video_prompt",
              "value": "={{ $('Loop Over Items').item.json.video }} {{ $('Loop Over Items').item.json.dialog }}",
              "type": "string"
            },
            {
              "id": "3e7241c7-de01-47dc-a934-3ecedeb1d59d",
              "name": "aspect_ratio",
              "value": "=9:16",
              "type": "string"
            },
            {
              "id": "d79179c7-8f73-4667-8e83-a25318716871",
              "name": "resolution",
              "value": "=1080p",
              "type": "string"
            },
            {
              "id": "78790fbf-e397-4818-881c-cfcdb760c701",
              "name": "model",
              "value": "veo-3.1-fast-generate-preview",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1536,
        1376
      ],
      "id": "f72f42d9-d164-41c4-bab1-d5b55fad94b0",
      "name": "Utils"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://us-central1-aiplatform.googleapis.com/v1/projects/{{ $('Utils').item.json['YOUR-PROJECT-ID'] }}/locations/us-central1/publishers/google/models/{{ $('Utils').item.json.model }}:predictLongRunning",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"instances\": [\n    {\n      \"image\": {\n        \"bytesBase64Encoded\": \"{{ $json['BASE64-EDITED-IMAGE'] }}\",\n        \"mimeType\": \"image/png\"\n      },          \n      \"prompt\": \"{{ $json.video_prompt }}\"\n    }\n  ],\n  \"parameters\": {\n    \"aspectRatio\": \"{{ $json.aspect_ratio }}\",\n    \"durationSeconds\": 8,\n    \"personGeneration\": \"allow_adult\",\n    \"generateAudio\": true,\n    \"resolution\": \"{{ $json.resolution }}\"\n  }\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1744,
        1312
      ],
      "id": "9ce4e8fd-be79-4181-9360-5479a269ecc5",
      "name": "Veo 3.1",
      "retryOnFail": true,
      "credentials": {
        "googleOAuth2Api": {
          "id": "bvqMCd9nmv51CqwH",
          "name": "Google account"
        }
      }
    },
    {
      "parameters": {
        "operation": "toBinary",
        "sourceProperty": "response.videos[0].bytesBase64Encoded",
        "binaryPropertyName": "=data",
        "options": {}
      },
      "type": "n8n-nodes-base.convertToFile",
      "typeVersion": 1.1,
      "position": [
        2624,
        1296
      ],
      "id": "1a1d88b5-ac11-43a1-aa2d-4cbeebb5ac8e",
      "name": "Convert to File Result"
    },
    {
      "parameters": {
        "operation": "sendVideo",
        "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
        "binaryData": true,
        "additionalFields": {
          "caption": "={{ $('Loop Over Items').item.json.caption }}"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        2848,
        1376
      ],
      "id": "d0820faa-1b77-464a-a325-52517a9f4b3a",
      "name": "Send a video",
      "webhookId": "a4e737fb-8787-4f83-9d4d-33587c88fc0f",
      "retryOnFail": true,
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://us-central1-aiplatform.googleapis.com/v1/projects/{{ $('Utils').item.json['YOUR-PROJECT-ID'] }}/locations/us-central1/publishers/google/models/{{ $('Utils').item.json.model }}:fetchPredictOperation",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"operationName\": \"{{ $('Veo 3.1').item.json.name }}\"\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2192,
        1312
      ],
      "id": "2f895975-dbc2-48a7-80e5-f65131edec08",
      "name": "Get Video",
      "retryOnFail": true,
      "credentials": {
        "googleOAuth2Api": {
          "id": "bvqMCd9nmv51CqwH",
          "name": "Google account"
        }
      }
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
        "text": "=Judul: {{ $('AI Agent').item.json.output.title }}\nDeskripsi: {{ $('AI Agent').item.json.output.description }}",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        848,
        1200
      ],
      "id": "bfea3c90-38fc-446c-9eb3-8f662b21656f",
      "name": "Send a text message [DONE]",
      "webhookId": "fb2a8750-292c-4c1c-bba3-d43b28ba6ca8",
      "executeOnce": true,
      "retryOnFail": true,
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
        "text": "Masukan gambar atau bisa ditambahkan caption untuk hasil yang bagus",
        "additionalFields": {
          "appendAttribution": false
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        1072,
        960
      ],
      "id": "79ad501d-35e8-48c1-b10f-fd2372698887",
      "name": "Send a text message [ERROR]",
      "webhookId": "6a315d57-d98e-4d02-98cc-458457996a61",
      "retryOnFail": true,
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "operation": "sendPhoto",
        "chatId": "={{ $('Telegram Trigger').item.json.message.chat.id }}",
        "binaryData": true,
        "binaryPropertyName": "edited",
        "additionalFields": {
          "caption": "={{ $('Loop Over Items').item.json.image }}"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        1296,
        1200
      ],
      "id": "3192d8a5-28f0-49b2-bbe4-21f25eacce80",
      "name": "Send a photo message",
      "webhookId": "7a2cad0f-d218-41b1-bc18-f17373a6f8a6",
      "retryOnFail": true,
      "credentials": {
        "telegramApi": {
          "id": "HtRRGCstQWhGCQ1e",
          "name": "مُعد الفيديو (VidPreparer)"
        }
      }
    },
    {
      "parameters": {
        "resource": "video",
        "operation": "upload",
        "title": "={{ $('Loop Over Items').item.json.caption }}",
        "regionCode": "ID",
        "categoryId": "28",
        "options": {
          "description": "={{ $('Loop Over Items').item.json.video }}",
          "privacyStatus": "public",
          "tags": "n8n, automation"
        }
      },
      "type": "n8n-nodes-base.youTube",
      "typeVersion": 1,
      "position": [
        2848,
        1200
      ],
      "id": "14edae15-1542-4d46-8be7-71289e45c29e",
      "name": "Upload a video",
      "credentials": {
        "youTubeOAuth2Api": {
          "id": "OymTe6I1g2HtTIwb",
          "name": "YouTube account 2"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "79c22793-6816-4c18-a19f-26f2adc566ec",
              "leftValue": "={{ $json.response.videos[0].bytesBase64Encoded }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "exists",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        2416,
        1312
      ],
      "id": "09b7a701-352b-4953-8950-f9496665dbdb",
      "name": "If Finished"
    },
    {
      "parameters": {
        "amount": 20
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        1968,
        1312
      ],
      "id": "091f1b1e-bef7-4af9-b11c-a81b5eedbea0",
      "name": "Wait 20 Sec",
      "webhookId": "c26e0d0d-3039-4da5-9c76-b9249d40d673"
    },
    {
      "parameters": {
        "content": "🚀 خليك معنا!\n\nعشان ما تفوّت أي تحديثات عن الذكاء الاصطناعي، الأتمتة، ونصائح التقنية… كل اللي عليك تضغط هذا الرابط 👉\nhttps://t.me/shakerameenai\n\nوايضا لو حاب تسأل، تناقش، أو تشارك أفكارك",
        "height": 256,
        "width": 368,
        "color": 7
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        464,
        432
      ],
      "id": "bf6a7952-2391-4c0a-bf86-563f444f6344",
      "name": "Sticky Note1"
    },
    {
      "parameters": {
        "content": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nستبدال القيم\n\nYOUR-PROJECT-ID\nاستبدله بـ Project ID الخاص بك في Google Cloud.\n👉 تفقده من هنا: [Google Cloud Console](https://console.cloud.google.com/welcome)",
        "height": 592,
        "width": 256,
        "color": 6
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        1456,
        1280
      ],
      "typeVersion": 1,
      "id": "21abc39b-e9dd-4f4e-ae40-7e434fdf1de6",
      "name": "Sticky Note2"
    },
    {
      "parameters": {
        "content": "## قائمة التحقق \n\n- [ ] توكن بوت تيليغرام من BotFather\n- [ ] مفتاح Google Gemini API\n- [ ] مفتاح OpenRouter API (اختياري)\n- [ ] Google Cloud Project ID (مفعّل على Tier 1 مع الفوترة)\n- [ ] Google OAuth2 Client ID & Secret\n- [ ] تفعيل Vertex AI API\n- [ ] تفعيل YouTube Data API v3\n",
        "height": 256,
        "width": 368,
        "color": 3
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        464,
        176
      ],
      "id": "02f63454-3bd7-492c-b4a1-b96f13fae6f8",
      "name": "Sticky Note4"
    },
    {
      "parameters": {
        "content": "🛠️ دليل إعداد بيانات الدخول (Credentials)\n1. بيانات دخول بوت تيليغرام\n\nأضِف بيانات اعتماد Telegram عبر إنشاء بوت من خلال BotFather لاستخدامها مع العقد:\nTelegram Trigger، Get a File، Send a Text Message، Send a Photo Message، Send a Video.\n\nالخطوات:\n\nافتح تطبيق تيليغرام وابحث عن @BotFather\n\nأرسل الأمر /newbot لإنشاء بوت جديد\n\nاختر اسم (يمكن تغييره لاحقًا) و اسم مستخدم للبوت (يجب أن ينتهي بـ \"bot\" ولا يمكن تغييره لاحقًا)\n\nانسخ Access Token الذي يعطيك BotFather\n\nأضف التوكن داخل إعدادات Telegram Credentials في n8n\n\n📖 للمزيد:  [Dokumentasi Telegram Credentials](https://docs.n8n.io/integrations/builtin/credentials/telegram/)\n\n\n2. بيانات دخول Google Gemini API\n\nأضِف بيانات Google Gemini لاستخدامها مع العقد:\nAnalyze an Image، Google Gemini Chat Model، Edit an Image.\n\nطريقة الحصول على API Key:\n\nادخل إلى [Google AI Studio](https://aistudio.google.com/api-keys)\n\nقم بإنشاء API Key جديدة للمشروع\n\nأضِف الـ API Key داخل Google Gemini Credentials في n8n\n\n3. بيانات OpenRouter API (اختياري)\n\nأضِف مفتاح OpenRouter لاستخدامه مع نموذج GPT-3.5-Mini كخيار احتياطي (Fallback).\nإذا لم تكن بحاجة إليه، يمكن حذف العقدة أو تعطيلها.\n\nطريقة الحصول على API Key:\n\nادخل إلى صفحة  [OpenRouter API Keys](https://openrouter.ai/settings/keys)\n\nأنشئ مفتاحًا جديدًا واذكره\n\nأضِفه داخل OpenRouter Credentials في n8n\n\n4. Google Cloud Project ID\n\nقم بتعديل YOUR-PROJECT-ID في عقدة Utils بإضافة الـ Project ID الخاص بك من Google Cloud Console، بشرط أن يكون المشروع مرفوعًا إلى Tier 1 (ومفعّل فيه الفوترة).\n\nمزايا Google Cloud:\n\nتحصل على رصيد مجاني بقيمة $300\n\nيجب إضافة بطاقة دفع للتفعيل\n\nقم بإنشاء API Key من[Google AI Studio](https://aistudio.google.com/api-keys)   لاستخدام ميزات AI المدفوعة مثل Edit an Image\n\n5. بيانات Google OAuth2 (Veo 3.1)\n\nعقدة Veo 3.1 وعقدة Get Video تحتاج إلى Client ID و Client Secret.\n\nخطوات الإعداد:\n\nادخل إلى [Google Cloud Credentials Console](https://console.cloud.google.com/apis/credentials)\n\nأنشئ OAuth 2.0 Client ID\n\nانسخ الـ Client ID والـ Client Secret\n\nفعّل Vertex AI API من Marketplace [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/google/aiplatform.googleapis.com)\n\nأضِف هذه البيانات داخل عقد Veo 3.1 و Get Video في n8n\n\n6. بيانات دخول YouTube API\n\nاستخدم نفس Client ID و Client Secret السابقين في إعداد YouTube API.\n\nملاحظة:\nتأكد من تفعيل YouTube Data API v3 داخل Google Cloud Console في نفس المشروع.",
        "height": 1536,
        "width": 656,
        "color": 5
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -208,
        160
      ],
      "id": "fedc7ef9-45b7-4713-bdf1-1d1b888780d4",
      "name": "Sticky Note"
    }
  ],
  "pinData": {},
  "connections": {
    "Telegram Trigger": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "Get a file",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Send a text message [ERROR]",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Analyze an image": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get a file": {
      "main": [
        [
          {
            "node": "Analyze an image",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Split Out",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GPT-5-Mini": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 1
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "AI Agent",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "Think": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Split Out": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit an image": {
      "main": [
        [
          {
            "node": "Extract from File",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send a photo message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Binary Data": {
      "main": [
        [
          {
            "node": "Edit an image",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [
          {
            "node": "Send a text message [DONE]",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Get Binary Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from File": {
      "main": [
        [
          {
            "node": "Utils",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Utils": {
      "main": [
        [
          {
            "node": "Veo 3.1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Veo 3.1": {
      "main": [
        [
          {
            "node": "Wait 20 Sec",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Convert to File Result": {
      "main": [
        [
          {
            "node": "Send a video",
            "type": "main",
            "index": 0
          },
          {
            "node": "Upload a video",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send a video": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Video": {
      "main": [
        [
          {
            "node": "If Finished",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If Finished": {
      "main": [
        [
          {
            "node": "Convert to File Result",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Wait 20 Sec",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait 20 Sec": {
      "main": [
        [
          {
            "node": "Get Video",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "52009e4b-f23b-41e0-9479-ce9083aa7067",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "c2ff20e54a5b674b61c64a8ccaa5a6ee9d6d6109b706e160abd69e091dd482a0"
  },
  "id": "Qu8SeTXyHWxS5MUh",
  "tags": []
}
