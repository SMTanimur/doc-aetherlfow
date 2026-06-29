# Authentication (Developer Login)

To invoke AetherFlow backend endpoints programmatically, developer clients must authenticate and obtain a temporary Bearer JSON Web Token (JWT).

### Endpoint Contract
```http
POST /auth/login
Content-Type: application/json
```

---

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **email** | `string` | Yes | Registered developer email account. |
| **password** | `string` | Yes | Account password credentials. |

---

### Response Payload
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60a7201b8e310dc411a00a12",
    "name": "Alex Mercer",
    "email": "alex@company.com",
    "role": "user"
  }
}
```
