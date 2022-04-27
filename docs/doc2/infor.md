---
title: "DOC² - Infor Use Cases"
description: Different Use Cases DOC² with Infor
date: "2022-01-24"
tags:
  - DOC²
  - PO Matching
  - Infor LN
  - Infor M3
  - Use Cases
---

## Different Use Cases

### Only Invoice

This is the most easy use case. 95% of call Ephesoft ( IDM Capture ) customer use this use case.

``` mermaid
graph LR
  A[Start] --> B{Invoice?};
  Infor[Infor] --> |Master Data Validation| C;
  B -->|Yes| C[Extract Header Fields];
  C -->|Optional| T[Table Fields];
  T -->C;
  C --> D[Send to Infor];
  D --> E;
  B ---->|No| E[End];
```

With DOC² you can do more

``` mermaid
graph LR
  A[Start] --> B{Invoice?};
  B -->|Yes| C[Extract];
  C -->|Optional| T[Table Extract];
  T -->C;
  Infor[Infor] --> |Master Data Validation| C;
  C --> D[Convert to ZUGFeRD];
  D --> F[Send to Infor];
  F --> Z;
  B ---->|No| Z[End];
```

### Invoice and Delivery Note

``` mermaid
graph LR
  A[Start] --> B{Classification?};
  B -->|Invoice| Extract[Extract];
  B -->|Delivery Note| Extract;
  Extract -->|Optional| T[Table Extract];
  T -->Extract;
  Infor --> |Master Data Validation| Extract;
  Extract --> ION[Infor ION & IDM];
  B -->|Else| G[Only OCR];
  G -->IDM[Send PDF to Infor IDM];
  IDM --> Infor;
  ION --> Infor;
  Infor --> End[End];

```

### Invoice and Orders incl. PO Matching and ZUGFeRD and Order-X

``` mermaid
graph LR
  A[Start] --> B{Classification?};
  B -->|Invoice| Extract[Extract];
  B -->|Delivery Note| Extract;
  B ---->|Order confirmation| Extract;
  Extract -->T[Table Fields];
  T -->Extract;
  Extract ---> D[Convert to ZUGFeRD];
  Extract --> PO;
  D --> F[Send to Infor PDF + ION];
  F --> Infor;
  PO --> |Confirm PO|Infor;
  B -->|Else| G[Only OCR];
  G -->H[Send PDF to Infor IDM];
  H --> Infor[Infor];
  Infor[Infor] --> |Purchase Order|PO[PO Matching];
  Infor[Infor] --> |Master Data Validation| Extract;
  PO --> Order-X[Order-X];
  Extract --> Order-X;
  Infor --> Order-X;
  Order-X --> Supplier[Supplier];
  Supplier --> End;
  Infor --> End;

```

# Add Infor ION API

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/N64jzntUMao" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Add Connection Points in Infor OS

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/ZMVqpRRkv48" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Add Connection Points in Infor OS

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/sYST3GLn1IY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>





# Purchase Order

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/fkJrEDuG5Nw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Delivery Note

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/4KsliipUFx8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Invoice

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/k9z586vsLZs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
