# Test Data Directory

This directory contains downloaded test data files used for snapshot tests.

## Recording URLs

To record which remote files are accessed during tests:

```bash
yarn test:record
```

This will run all tests and save the list of accessed URLs to `fetch-urls.json`.

## Downloading Data

After recording URLs, download the data files:

```bash
yarn download-test-data
```

This will download all recorded files to `data/s3.amazonaws.com/...` maintaining
the URL structure.

## Using Local Data

Once data is downloaded, run tests with local data:

```bash
yarn test:local
```

This avoids network requests and makes tests faster and more reliable.

## Workflow

1. **First time setup:**

   ```bash
   yarn test:record          # Run tests and record URLs
   yarn download-test-data   # Download the files
   yarn test:local          # Run tests with local data
   ```

2. **After adding new tests:**
   ```bash
   yarn test:record          # Record any new URLs
   yarn download-test-data   # Download new files (skips existing)
   yarn test:local          # Verify tests work with local data
   ```

## Files

- `fetch-urls.json` - List of all URLs accessed during tests (committed to git)
- `s3.amazonaws.com/` - Downloaded data files (not committed, too large)
