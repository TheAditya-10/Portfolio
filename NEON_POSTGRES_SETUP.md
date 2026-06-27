# Neon Postgres Setup

The site metrics now use Neon/Postgres instead of AWS RDS MySQL.

## Environment Variables

Set this in `.env.local` and in your hosting provider:

```env
DATABASE_URL=postgresql://user:password@ep-example-pooler.region.aws.neon.tech/dbname?sslmode=require
POSTGRES_CONNECT_TIMEOUT_MS=5000
METRICS_MEMORY_FALLBACK=true
POSTGRES_RETRY_COOLDOWN_MS=30000
```

Use the pooled Neon connection string for Vercel/serverless deployments.

Remove the old AWS/RDS variables when deployed:

```env
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_URL=
METRICS_BACKEND_URL=
METRICS_BACKEND_SECRET=
```

## Tables

The app creates these tables automatically on first metric read/write:

```sql
CREATE TABLE IF NOT EXISTS site_counters (
  counter_key TEXT PRIMARY KEY,
  counter_value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_likes (
  project_id TEXT PRIMARY KEY,
  likes BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT,
  user_agent TEXT,
  email_status TEXT NOT NULL DEFAULT 'pending',
  email_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS service_enquiries_created_at_idx
ON service_enquiries (created_at DESC);
```

## Preserve Existing RDS Counts

Before shutting down RDS, export current values from MySQL:

```sql
SELECT counter_key, counter_value FROM site_counters;
SELECT project_id, likes FROM project_likes;
```

Then insert them into Neon:

```sql
INSERT INTO site_counters (counter_key, counter_value)
VALUES ('profile_views', 123)
ON CONFLICT (counter_key)
DO UPDATE SET counter_value = EXCLUDED.counter_value, updated_at = NOW();

INSERT INTO project_likes (project_id, likes)
VALUES ('foresightx', 10)
ON CONFLICT (project_id)
DO UPDATE SET likes = EXCLUDED.likes, updated_at = NOW();
```

After deployment is confirmed, you can stop or delete the AWS RDS instance to stop the bill.
