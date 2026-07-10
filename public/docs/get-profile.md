# Retrieve User Profile

Fetch the profile of the currently authenticated user. Returns account details and workspace membership information.

---

### Endpoint

```http
GET /users/me
Authorization: Bearer af_live_42910aef192b
```

---

### Response Schema

```json
{
  "_id": "60a7201b8e310dc411a00a12",
  "name": "Alex Mercer",
  "email": "alex@company.com",
  "avatar": "https://avatars.example.com/alex.jpg",
  "role": "admin",
  "isEmailVerified": true,
  "workspaces": [
    {
      "_id": "6a3329fedc827a13d85059fd",
      "name": "Acme Corp AI",
      "role": "owner"
    }
  ],
  "createdAt": "2026-06-25T12:00:00Z",
  "lastLoginAt": "2026-07-09T08:30:00Z"
}
```

---

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | MongoDB ObjectId of the user |
| `name` | `string` | Full display name |
| `email` | `string` | Registered email address |
| `role` | `string` | Global platform role (`admin` or `user`) |
| `isEmailVerified` | `boolean` | Whether the email has been verified |
| `workspaces` | `array` | Workspaces the user belongs to with their role in each |
| `createdAt` | `string` | ISO 8601 account creation timestamp |
| `lastLoginAt` | `string` | ISO 8601 timestamp of last login |

> [!NOTE]
> When authenticating with an integration key (`af_live_...`), this endpoint returns the profile of the workspace owner who generated the key, not an end-user.
