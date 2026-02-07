## Backend Service

### Development

```bash
npm run dev
```

### Seed Demo Users (recommended after first setup)

```bash
npm run seed
```

This command creates or updates the demo users with the correct roles and hashed passwords.

**Demo credentials:**

- **Admin:** admin@demo.com / password
- **Teacher:** teacher@demo.com / password
- **Student:** student@demo.com / password

### Notes

- The database sync is non-destructive by default (no automatic table drops on server start).
- If you want a clean database, manually clear tables and re-run the seed.