#!/usr/bin/env node

/**
 * Script to retrieve the latest NextLayer deployment URL from GitHub Actions
 * This can be used in Lovable/Replit to fetch the deployment URL
 * 
 * Usage:
 *   node scripts/get-deployment-url.js [GITHUB_TOKEN] [OWNER] [REPO]
 * 
 * Or set environment variables:
 *   GITHUB_TOKEN=your_token node scripts/get-deployment-url.js
 */

const https = require('https');

const GITHUB_TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;
const OWNER = process.argv[3] || process.env.GITHUB_REPOSITORY_OWNER || 'your-username';
const REPO = process.argv[4] || process.env.GITHUB_REPOSITORY?.split('/')[1] || 'your-repo';

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN is required');
  console.error('Usage: node scripts/get-deployment-url.js <GITHUB_TOKEN> [OWNER] [REPO]');
  process.exit(1);
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function getLatestDeploymentURL() {
  try {
    // Get the latest workflow run for the deploy-nexlayer workflow
    const workflowOptions = {
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}/actions/workflows/deploy-nexlayer.yml/runs?per_page=1&status=success`,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NextLayer-Deployment-URL-Fetcher'
      }
    };

    const workflowResponse = await makeRequest(workflowOptions);
    
    if (workflowResponse.status !== 200) {
      console.error(`❌ Failed to fetch workflow runs: ${workflowResponse.status}`);
      console.error(workflowResponse.data);
      return null;
    }

    const runs = workflowResponse.data.workflow_runs;
    if (!runs || runs.length === 0) {
      console.log('ℹ️  No successful deployments found yet');
      return null;
    }

    const latestRun = runs[0];
    const runId = latestRun.id;

    // Get the job details
    const jobOptions = {
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}/actions/runs/${runId}/jobs`,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NextLayer-Deployment-URL-Fetcher'
      }
    };

    const jobResponse = await makeRequest(jobOptions);
    
    if (jobResponse.status !== 200) {
      console.error(`❌ Failed to fetch job details: ${jobResponse.status}`);
      return null;
    }

    const jobs = jobResponse.data.jobs;
    if (!jobs || jobs.length === 0) {
      console.log('ℹ️  No jobs found for this workflow run');
      return null;
    }

    const deployJob = jobs.find(job => job.name === 'deploy') || jobs[0];
    
    // Try to extract URL from job logs or check if it's stored as an artifact
    // For now, we'll check the logs
    const logOptions = {
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}/actions/jobs/${deployJob.id}/logs`,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NextLayer-Deployment-URL-Fetcher'
      }
    };

    // Note: GitHub API doesn't return logs as JSON, so we'd need to parse the text
    // For a simpler approach, we can use GitHub's API to get the workflow run summary
    
    console.log('✅ Latest deployment found!');
    console.log(`📅 Deployed at: ${latestRun.created_at}`);
    console.log(`🔗 Workflow run: ${latestRun.html_url}`);
    console.log(`📝 Commit: ${latestRun.head_sha.substring(0, 7)}`);
    console.log('');
    console.log('💡 To get the deployment URL, check the workflow run logs or summary.');
    console.log(`   Visit: ${latestRun.html_url}`);
    
    return {
      runId,
      runUrl: latestRun.html_url,
      commit: latestRun.head_sha,
      createdAt: latestRun.created_at
    };
  } catch (error) {
    console.error('❌ Error fetching deployment URL:', error.message);
    return null;
  }
}

// Alternative: Store deployment URL as a repository variable or secret
// This would require the workflow to write it somewhere accessible

async function main() {
  console.log('🔍 Fetching latest NextLayer deployment URL...\n');
  const result = await getLatestDeploymentURL();
  
  if (result) {
    // Output in a format that can be easily parsed
    console.log('\n📋 Deployment Info (JSON):');
    console.log(JSON.stringify(result, null, 2));
  }
}

main().catch(console.error);

