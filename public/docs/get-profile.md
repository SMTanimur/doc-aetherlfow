# Retrieve User Profile

Fetches authenticated user account profiles and roles inside the system.

### Endpoint Contract
```http
GET /users/me
Authorization: Bearer <your_jwt_access_token>
```

---

### Response Payload
```json
{
  "success": true,
  "user": {
    "id": "60a7201b8e310dc411a00a12",
    "name": "Alex Mercer",
    "email": "alex@company.com",
    "role": "user",
    "createdAt": "2026-06-25T12:00:00Z"
  }
}
```
