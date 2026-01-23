# Query Parameters Documentation

## Overview

This document describes the query parameters used for filtering and retrieving account records.

## Parameters

### numeroConta

- **Type:** String
- **Required:** Yes
- **Description:** Número da conta habilitada (Enabled account number)
- **Example:** `123456`

```
numeroConta=123456
```

### dataInicial

- **Type:** String
- **Required:** Yes
- **Format:** `yyyy-MM-dd`
- **Description:** Data inicial (Start date)
- **Example:** `2025-01-01`

```
dataInicial=2025-01-01
```

### dataFinal

- **Type:** String
- **Required:** Yes
- **Format:** `yyyy-MM-dd`
- **Description:** Data final (End date)
- **Example:** `2025-01-31`

```
dataFinal=2025-01-31
```

### situacao

- **Type:** Integer
- **Required:** Yes
- **Description:** Situação do registro (Record status)
- **Example:** `1`

**Options:**

| Value | Label | Description |
|-------|-------|-------------|
| `1` | Em aberto | Open |
| `2` | Agendado | Scheduled |
| `3` | Liquidado | Settled |
| `4` | Baixado | Written off |

```
situacao=1
```

### tipoData

- **Type:** Integer
- **Required:** Yes
- **Description:** Tipo de data para filtro (Date type for filtering)
- **Example:** `1`

**Options:**

| Value | Label | Description |
|-------|-------|-------------|
| `1` | Vencimento | Due date |
| `2` | Emissão | Issue date |
| `3` | Inclusão | Inclusion date |

```
tipoData=1
```

## Example Request

### Complete URL with Query Parameters

```
https://api.example.com/endpoint?numeroConta=123456&dataInicial=2025-01-01&dataFinal=2025-01-31&situacao=1&tipoData=1
```

### Using in n8n HTTP Request Node

In the HTTP Request node, add these parameters under "Send Query Parameters":

| Name | Value |
|------|-------|
| `numeroConta` | `123456` |
| `dataInicial` | `2025-01-01` |
| `dataFinal` | `2025-01-31` |
| `situacao` | `1` |
| `tipoData` | `1` |

### JSON Format

```json
{
  "numeroConta": "123456",
  "dataInicial": "2025-01-01",
  "dataFinal": "2025-01-31",
  "situacao": 1,
  "tipoData": 1
}
```

## Usage Notes

- All parameters are required for the request to succeed
- Date parameters must follow the `yyyy-MM-dd` format
- The `situacao` parameter controls which records are returned based on their current status
- The `tipoData` parameter determines which date field is used for the date range filter (dataInicial/dataFinal)
