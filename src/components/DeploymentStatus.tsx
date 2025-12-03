import { useState, useEffect } from 'react';
import { ExternalLink, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface DeploymentInfo {
  runId: number;
  runUrl: string;
  commit: string;
  createdAt: string;
  deploymentUrl?: string;
}

/**
 * Component to display NextLayer deployment status and URL
 * This can be used in Lovable/Replit to show the production deployment URL
 * 
 * To use this component:
 * 1. Set GITHUB_TOKEN as an environment variable in your Lovable/Replit project
 * 2. Set GITHUB_REPOSITORY (format: owner/repo-name)
 * 3. Add this component to your app
 */
export default function DeploymentStatus() {
  const [deploymentInfo, setDeploymentInfo] = useState<DeploymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeploymentInfo();
  }, []);

  const fetchDeploymentInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get GitHub token and repo from environment variables
      // In Lovable/Replit, these should be set in project settings
      const githubToken = import.meta.env.VITE_GITHUB_TOKEN || '';
      const githubRepo = import.meta.env.VITE_GITHUB_REPOSITORY || '';

      if (!githubToken || !githubRepo) {
        setError('GitHub token and repository not configured. Please set VITE_GITHUB_TOKEN and VITE_GITHUB_REPOSITORY environment variables.');
        setLoading(false);
        return;
      }

      const [owner, repo] = githubRepo.split('/');
      if (!owner || !repo) {
        setError('Invalid repository format. Should be owner/repo-name');
        setLoading(false);
        return;
      }

      // Fetch latest successful workflow run
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/deploy-nexlayer.yml/runs?per_page=1&status=success`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch deployment info: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const runs = data.workflow_runs;

      if (!runs || runs.length === 0) {
        setError('No successful deployments found yet. Push to main branch to trigger deployment.');
        setLoading(false);
        return;
      }

      const latestRun = runs[0];

      // Try to extract deployment URL from workflow run logs
      // Note: This is a simplified approach. In production, you might want to
      // store the URL in a more accessible way (e.g., GitHub repository variable, API endpoint)
      const deploymentInfo: DeploymentInfo = {
        runId: latestRun.id,
        runUrl: latestRun.html_url,
        commit: latestRun.head_sha,
        createdAt: latestRun.created_at,
      };

      // Try to get deployment URL from workflow run summary or logs
      // For now, we'll direct users to check the workflow run
      setDeploymentInfo(deploymentInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deployment information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>NextLayer Deployment Status</CardTitle>
          <CardDescription>Checking deployment status...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>NextLayer Deployment Status</CardTitle>
          <CardDescription>Deployment information</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!deploymentInfo) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          NextLayer Deployment Status
        </CardTitle>
        <CardDescription>Your production deployment information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Deployed:</span>
            <span className="text-sm font-medium">
              {new Date(deploymentInfo.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Commit:</span>
            <span className="text-sm font-mono">
              {deploymentInfo.commit.substring(0, 7)}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            🌐 <strong>Production URL:</strong>
          </p>
          <p className="text-sm mb-3 text-muted-foreground">
            Check the workflow run logs to get your deployment URL, or visit the workflow run page.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(deploymentInfo.runUrl, '_blank')}
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Deployment Details
          </Button>
        </div>

        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchDeploymentInfo}
            className="w-full"
          >
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

