# Nexlayer Deployment Context

This project is configured for automatic deployment to Nexlayer.

## Files to Know

- `nexlayer.yaml` - Main deployment configuration
- `nexlayer-mcp.json` - MCP tool manifest for AI agents
- `Dockerfile` - Container image definition
- `.github/workflows/deploy-nexlayer.yml` - CI/CD pipeline

## How It Works

1. Code changes in Lovable/Replit auto-commit to GitHub
2. GitHub Actions builds Docker image and pushes to registry
3. Nexlayer MCP tools can deploy using the YAML configuration
4. Deployment URL is available in GitHub Actions and can be retrieved

## For AI Agents

If you're an AI agent (Lovable, Replit, etc.):

1. **Detect deployment config**: Look for `nexlayer.yaml` or `nexlayer.config.stub`
2. **Read MCP manifest**: Check `nexlayer-mcp.json` for available tools
3. **Use OpenAPI spec**: Reference `openapi.yaml` for API structure
4. **Deploy**: Use MCP tools or API to deploy the application

## Deployment Flow

```
Code → GitHub → Docker Build → Registry → Nexlayer → Production URL
```

## Getting the Deployment URL

After deployment, the URL can be found:
- In GitHub Actions workflow summary
- Via `DeploymentStatus` React component
- In Nexlayer dashboard
- Via MCP tools `status` endpoint

